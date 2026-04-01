#!/usr/bin/env python3
"""
qa-posts.py — Source-level QA for WaywardHouse Jekyll posts.

Checks every .md file in _posts/ for known rendering gotchas:

  1. MATH_DOLLAR         — math: true post has bare $digit in prose
  2. INVALID_JSON        — data-options='...' attribute contains invalid JSON
  3. NO_HEIGHT           — <div data-viz="echarts"> missing height or has zero height
  4. VIZ_NO_TAG          — post has data-viz/data-leaflet but no viz: true
  5. APOS_IN_ATTR        — data-options='...' contains an apostrophe (breaks HTML attribute)
  6. DATE_URL            — link contains date-format path /YYYY/MM/DD/slug/ (site uses /:title/)
  7. STORY_NO_TAG        — post has story markup but no story: true
  8. LEAFLET_MARKER_APOS — data-markers='...' contains apostrophe (breaks HTML attribute)

Usage:
  python3 scripts/qa-posts.py
  python3 scripts/qa-posts.py --fix
  python3 scripts/qa-posts.py --changed
  python3 scripts/qa-posts.py --check MATH_DOLLAR NO_HEIGHT

Exit code:
  0 = clean
  1 = issues found
  2 = config/path error
"""

import sys
import os
import re
import json
import html
import argparse
import subprocess

POSTS_DIR = os.path.join(os.path.dirname(__file__), "..", "_posts")

ECHARTS_FALLBACK_HEIGHT = "420px"
ECHARTS_FALLBACK_MIN_HEIGHT = "320px"


# ── Helpers ──────────────────────────────────────────────────────────────────

def extract_front_matter(content):
    """Return raw YAML front matter block as a string, or '' if none."""
    m = re.match(r"^---\n(.*?)\n---\n?", content, re.DOTALL)
    return m.group(1) if m else ""


def front_matter_has_flag(content, key):
    """True if front matter contains `key: true`."""
    fm = extract_front_matter(content)
    return bool(re.search(rf"^{re.escape(key)}:\s*true\s*$", fm, re.MULTILINE))


def line_of_offset(content, offset):
    """1-based line number for a character offset."""
    return content[:offset].count("\n") + 1


def extract_data_options(content):
    """Yield (char_offset, raw_json_string) for each data-options='...' attribute."""
    for m in re.finditer(r"data-options='", content):
        start = m.end()
        raw = []
        j = start
        while j < len(content):
            if content[j] == "'":
                break
            raw.append(content[j])
            j += 1
        yield m.start(), "".join(raw)


def extract_data_markers(content):
    """Yield (char_offset, raw_json_string) for each data-markers='...' attribute."""
    for m in re.finditer(r"data-markers='", content):
        start = m.end()
        raw = []
        j = start
        while j < len(content):
            if content[j] == "'":
                break
            raw.append(content[j])
            j += 1
        yield m.start(), "".join(raw)


def is_prose_line(line):
    """True if a line is prose text, not raw HTML/config lines."""
    stripped = line.strip()
    return not (
        stripped.startswith("<div data-viz=") or
        stripped.startswith('<p class="viz-caption') or
        stripped.startswith("<div data-leaflet") or
        stripped.startswith('<div class="story-step"') or
        stripped.startswith("data-update=")
    )


def get_changed_files():
    """Return list of _posts/*.md files changed in HEAD, index, or working tree."""
    repo_root = os.path.dirname(POSTS_DIR)
    changed = set()

    commands = [
        ["git", "diff", "--name-only", "HEAD~1", "HEAD"],
        ["git", "diff", "--name-only", "--cached"],
        ["git", "diff", "--name-only"],
    ]

    for cmd in commands:
        try:
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                cwd=repo_root,
                check=False,
            )
            for line in result.stdout.splitlines():
                line = line.strip()
                if line:
                    changed.add(line)
        except Exception:
            pass

    return sorted(
        f for f in changed
        if f.startswith("_posts/") and f.endswith(".md")
    )


def get_opening_tag(content, start_offset):
    """Return (tag_text, tag_end_offset) for the opening tag starting at start_offset."""
    tag_end = content.find(">", start_offset)
    if tag_end == -1:
        return None, None
    return content[start_offset:tag_end + 1], tag_end


def parse_style_attr(tag_text):
    """Return style attribute value or None."""
    m = re.search(r'style="([^"]*)"', tag_text)
    return m.group(1) if m else None


def extract_css_prop(style_value, prop):
    """Extract a CSS property value from an inline style string."""
    m = re.search(rf"(?:^|;)\s*{re.escape(prop)}\s*:\s*([^;]+)", style_value, re.IGNORECASE)
    return m.group(1).strip() if m else None


def is_zero_css_size(value):
    """True if a CSS size string is effectively zero."""
    if value is None:
        return False
    v = value.strip().lower()
    return v in {"0", "0px", "0rem", "0em", "0vh", "0vw", "0%"}


# ── Checks ───────────────────────────────────────────────────────────────────

def check_math_dollar(fname, content):
    """MATH_DOLLAR: math-enabled post has bare $digit in prose."""
    if not front_matter_has_flag(content, "math"):
        return []

    issues = []
    for lineno, line in enumerate(content.split("\n"), 1):
        if not is_prose_line(line):
            continue
        for m in re.finditer(r"\$(\d)", line):
            issues.append({
                "check": "MATH_DOLLAR",
                "file": fname,
                "line": lineno,
                "detail": (
                    f"Bare ${m.group(1)}... in math-enabled post prose — "
                    "KaTeX may treat it as a math delimiter. Fix: replace $N with &#36;N"
                ),
                "fixable": True,
            })
    return issues


def check_invalid_json(fname, content):
    """INVALID_JSON: data-options='...' contains invalid JSON."""
    issues = []
    for offset, raw in extract_data_options(content):
        try:
            json.loads(html.unescape(raw))
        except json.JSONDecodeError as e:
            issues.append({
                "check": "INVALID_JSON",
                "file": fname,
                "line": line_of_offset(content, offset),
                "detail": f"data-options JSON parse error: {e}",
                "fixable": False,
            })
    return issues


def check_no_height(fname, content):
    """NO_HEIGHT: ECharts div missing explicit height or has zero height."""
    issues = []

    for m in re.finditer(r'<div\s+data-viz="echarts"', content):
        tag_text, _ = get_opening_tag(content, m.start())
        lineno = line_of_offset(content, m.start())

        if not tag_text:
            issues.append({
                "check": "NO_HEIGHT",
                "file": fname,
                "line": lineno,
                "detail": "Malformed ECharts opening tag — unable to verify height",
                "fixable": False,
            })
            continue

        style_value = parse_style_attr(tag_text)
        if style_value is None:
            issues.append({
                "check": "NO_HEIGHT",
                "file": fname,
                "line": lineno,
                "detail": (
                    f'ECharts div missing style height — chart may render at 0px. '
                    f'Fallback: height:{ECHARTS_FALLBACK_HEIGHT}; min-height:{ECHARTS_FALLBACK_MIN_HEIGHT}'
                ),
                "fixable": True,
            })
            continue

        height = extract_css_prop(style_value, "height")
        min_height = extract_css_prop(style_value, "min-height")

        if height is None:
            issues.append({
                "check": "NO_HEIGHT",
                "file": fname,
                "line": lineno,
                "detail": (
                    f'ECharts div style present but no height property — chart may render at 0px. '
                    f'Fallback: height:{ECHARTS_FALLBACK_HEIGHT}; min-height:{ECHARTS_FALLBACK_MIN_HEIGHT}'
                ),
                "fixable": True,
            })
            continue

        if is_zero_css_size(height):
            issues.append({
                "check": "NO_HEIGHT",
                "file": fname,
                "line": lineno,
                "detail": (
                    f'ECharts div has zero height ({height}) — chart will be invisible. '
                    f'Fallback: height:{ECHARTS_FALLBACK_HEIGHT}; min-height:{ECHARTS_FALLBACK_MIN_HEIGHT}'
                ),
                "fixable": True,
            })
            continue

        if min_height and is_zero_css_size(min_height):
            issues.append({
                "check": "NO_HEIGHT",
                "file": fname,
                "line": lineno,
                "detail": (
                    f'ECharts div has zero min-height ({min_height}) — layout is brittle. '
                    f'Fallback: min-height:{ECHARTS_FALLBACK_MIN_HEIGHT}'
                ),
                "fixable": True,
            })

    return issues


def check_viz_no_tag(fname, content):
    """VIZ_NO_TAG: post has data-viz/data-leaflet but no viz: true."""
    has_viz_el = bool(re.search(r"data-viz=", content) or re.search(r"data-leaflet", content))
    if not has_viz_el:
        return []

    if not front_matter_has_flag(content, "viz"):
        return [{
            "check": "VIZ_NO_TAG",
            "file": fname,
            "line": 1,
            "detail": (
                "Post has data-viz/data-leaflet elements but no viz: true in front matter — "
                "visualization assets may not load"
            ),
            "fixable": False,
        }]
    return []


def check_apos_in_attr(fname, content):
    """APOS_IN_ATTR: apostrophe inside single-quoted data-options attribute."""
    issues = []
    for offset, raw in extract_data_options(content):
        if "'" in raw:
            idx = raw.index("'")
            snippet = raw[max(0, idx - 20):idx + 20]
            issues.append({
                "check": "APOS_IN_ATTR",
                "file": fname,
                "line": line_of_offset(content, offset),
                "detail": (
                    "Apostrophe in data-options='...' breaks HTML attribute parsing. "
                    f"Near: ...{snippet}..."
                ),
                "fixable": False,
            })
    return issues


def check_date_url(fname, content):
    """DATE_URL: link uses /YYYY/MM/DD/slug/ format (site uses /:title/)."""
    issues = []
    for m in re.finditer(r'\(/\d{4}/\d{2}/\d{2}/[\w-]+/?', content):
        issues.append({
            "check": "DATE_URL",
            "file": fname,
            "line": line_of_offset(content, m.start()),
            "detail": f"Date-format URL {m.group()} — site uses permalink /:title/ so this will 404",
            "fixable": False,
        })
    return issues


def check_story_no_tag(fname, content):
    """STORY_NO_TAG: scrollytelling markup present but no story: true."""
    has_story = "story-section" in content or "story-step" in content
    if not has_story:
        return []

    if not front_matter_has_flag(content, "story"):
        return [{
            "check": "STORY_NO_TAG",
            "file": fname,
            "line": 1,
            "detail": (
                "Post has .story-section/.story-step markup but no story: true in front matter — "
                "scrollytelling assets may not load"
            ),
            "fixable": False,
        }]
    return []


def check_leaflet_marker_apos(fname, content):
    """LEAFLET_MARKER_APOS: apostrophe inside data-markers='...' attribute."""
    issues = []
    for offset, raw in extract_data_markers(content):
        if "'" in raw:
            idx = raw.index("'")
            snippet = raw[max(0, idx - 20):idx + 20]
            issues.append({
                "check": "LEAFLET_MARKER_APOS",
                "file": fname,
                "line": line_of_offset(content, offset),
                "detail": (
                    "Apostrophe in data-markers='...' breaks HTML attribute parsing. "
                    f"Near: ...{snippet}..."
                ),
                "fixable": False,
            })
    return issues


CHECKS = [
    check_math_dollar,
    check_invalid_json,
    check_no_height,
    check_viz_no_tag,
    check_apos_in_attr,
    check_date_url,
    check_story_no_tag,
    check_leaflet_marker_apos,
]


# ── Auto-fix ─────────────────────────────────────────────────────────────────

def fix_math_dollar(content):
    """Replace bare $digit in prose with &#36;digit."""
    fixed = []
    for line in content.split("\n"):
        if is_prose_line(line):
            fixed.append(re.sub(r"\$(\d)", r"&#36;\1", line))
        else:
            fixed.append(line)
    return "\n".join(fixed)


def normalize_style_with_fallback(style_value):
    """
    Ensure inline style has usable height/min-height for ECharts.
    Returns updated style string.
    """
    style = style_value.strip()

    if style and not style.endswith(";"):
        style += ";"

    height = extract_css_prop(style, "height")
    min_height = extract_css_prop(style, "min-height")

    if height is None or is_zero_css_size(height):
        if height is None:
            style += f" height:{ECHARTS_FALLBACK_HEIGHT};"
        else:
            style = re.sub(
                r"(^|;)\s*height\s*:\s*[^;]+",
                lambda m: f"{m.group(1)} height:{ECHARTS_FALLBACK_HEIGHT}",
                style,
                flags=re.IGNORECASE,
            )

    if min_height is None or is_zero_css_size(min_height):
        if min_height is None:
            style += f" min-height:{ECHARTS_FALLBACK_MIN_HEIGHT};"
        else:
            style = re.sub(
                r"(^|;)\s*min-height\s*:\s*[^;]+",
                lambda m: f"{m.group(1)} min-height:{ECHARTS_FALLBACK_MIN_HEIGHT}",
                style,
                flags=re.IGNORECASE,
            )

    style = re.sub(r"\s{2,}", " ", style).strip()
    return style


def fix_no_height(content):
    """
    Add or normalize height/min-height on ECharts divs.
    Safe fallback:
      height: 420px;
      min-height: 320px;
    """
    pattern = re.compile(r'<div\s+data-viz="echarts"[^>]*>')

    def repl(match):
        tag = match.group(0)
        style_match = re.search(r'style="([^"]*)"', tag)

        if style_match:
            old_style = style_match.group(1)
            new_style = normalize_style_with_fallback(old_style)
            return tag.replace(style_match.group(0), f'style="{new_style}"', 1)

        insert_at = len(tag) - 1
        style_attr = f' style="height:{ECHARTS_FALLBACK_HEIGHT}; min-height:{ECHARTS_FALLBACK_MIN_HEIGHT};"'
        return tag[:insert_at] + style_attr + tag[insert_at:]

    return pattern.sub(repl, content)


# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="QA checker for Jekyll posts")
    parser.add_argument("--fix", action="store_true", help="Auto-fix safe issues")
    parser.add_argument("--changed", action="store_true", help="Only check git-changed files")
    parser.add_argument(
        "--check",
        nargs="+",
        help="Only run specific checks (e.g. MATH_DOLLAR INVALID_JSON NO_HEIGHT)",
    )
    args = parser.parse_args()

    posts_dir = os.path.abspath(POSTS_DIR)
    if not os.path.isdir(posts_dir):
        print(f"ERROR: _posts/ not found at {posts_dir}", file=sys.stderr)
        sys.exit(2)

    if args.changed:
        rel_files = get_changed_files()
        files = [
            os.path.join(os.path.dirname(posts_dir), f)
            for f in rel_files
            if os.path.exists(os.path.join(os.path.dirname(posts_dir), f))
        ]
        if not files:
            print("No changed post files detected.")
            sys.exit(0)
    else:
        files = sorted(
            os.path.join(posts_dir, f)
            for f in os.listdir(posts_dir)
            if f.endswith(".md")
        )

    requested_checks = {x.upper() for x in args.check} if args.check else None
    active_checks = [
        c for c in CHECKS
        if requested_checks is None or c.__name__.replace("check_", "").upper() in requested_checks
    ]

    all_issues = []
    fixed_files = 0

    for filepath in files:
        fname = os.path.basename(filepath)

        try:
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()
        except Exception as e:
            print(f"ERROR reading {fname}: {e}")
            continue

        file_issues = []
        for check in active_checks:
            file_issues.extend(check(fname, content))

        if args.fix:
            issue_types = {i["check"] for i in file_issues}
            original_content = content

            if "MATH_DOLLAR" in issue_types:
                content = fix_math_dollar(content)

            if "NO_HEIGHT" in issue_types:
                content = fix_no_height(content)

            if content != original_content:
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(content)
                fixed_files += 1

            file_issues = []
            for check in active_checks:
                file_issues.extend(check(fname, content))

        all_issues.extend(file_issues)

    if args.fix and fixed_files:
        print(f"Auto-fixed safe issues in {fixed_files} file(s).")

    if not all_issues:
        print(f"✓ QA passed — {len(files)} post(s) checked, 0 issues.")
        sys.exit(0)

    by_check = {}
    for issue in all_issues:
        by_check.setdefault(issue["check"], []).append(issue)

    print(f"\n{'=' * 72}")
    print(f"QA FAILED — {len(all_issues)} issue(s) in {len(files)} post(s) checked")
    print(f"{'=' * 72}\n")

    for check_name, issues in sorted(by_check.items()):
        print(f"[{check_name}] — {len(issues)} occurrence(s)")
        for issue in issues[:10]:
            print(f"  {issue['file']}:{issue['line']}  {issue['detail'][:140]}")
        if len(issues) > 10:
            print(f"  ... and {len(issues) - 10} more")
        print()

    fixable = [i for i in all_issues if i["fixable"]]
    if fixable:
        print(
            f"Run with --fix to auto-correct {len(fixable)} safe issue(s) "
            "(currently MATH_DOLLAR and NO_HEIGHT)."
        )

    sys.exit(1)


if __name__ == "__main__":
    main()
