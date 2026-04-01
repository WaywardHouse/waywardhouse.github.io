#!/usr/bin/env zsh

set -e

echo "Converting American modelling spellings to British..."

git ls-files | while read file; do
  # Only process files that look like text
  if file "$file" | grep -q text; then
    sed -i '' \
      -e 's/\bmodelling\b/modelling/g' \
      -e 's/\bmodelled\b/modelled/g' \
      -e 's/\bmodeller\b/modeller/g' \
      "$file"
  fi
done

echo "Done."
