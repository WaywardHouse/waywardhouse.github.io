#!/usr/bin/env zsh

set -e

echo "Converting American modelling spellings to British..."

git ls-files | while read file; do
  # Only process files that look like text
  if file "$file" | grep -q text; then
    sed -i '' \
      -e 's/\bmodeling\b/modelling/g' \
      -e 's/\bmodeled\b/modelled/g' \
      -e 's/\bmodeler\b/modeller/g' \
      "$file"
  fi
done

echo "Done."
