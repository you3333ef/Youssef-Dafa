#!/bin/bash

echo "==================================================================="
echo "🔍 OG Images Verification Script"
echo "==================================================================="
echo ""

BASE_DIR="dist"
TOTAL_IMAGES=0
VALID_IMAGES=0
INVALID_IMAGES=0

echo "📊 Checking all OG images in $BASE_DIR..."
echo ""

for img in $BASE_DIR/og-*.jpg; do
    if [ -f "$img" ]; then
        TOTAL_IMAGES=$((TOTAL_IMAGES + 1))
        
        SIZE=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
        SIZE_KB=$((SIZE / 1024))
        
        TYPE=$(file "$img" | grep -o "JPEG image data" || echo "INVALID")
        DIMENSIONS=$(file "$img" | grep -o "1200x630" || echo "")
        
        BASENAME=$(basename "$img")
        
        if [[ "$TYPE" == "JPEG image data" && "$SIZE_KB" -gt 10 ]]; then
            echo "✅ $BASENAME - ${SIZE_KB}KB - JPEG ✓"
            VALID_IMAGES=$((VALID_IMAGES + 1))
        else
            echo "❌ $BASENAME - ${SIZE_KB}KB - $TYPE"
            INVALID_IMAGES=$((INVALID_IMAGES + 1))
        fi
    fi
done

echo ""
echo "==================================================================="
echo "📈 Summary:"
echo "==================================================================="
echo "Total OG Images: $TOTAL_IMAGES"
echo "Valid JPEG Images: $VALID_IMAGES"
echo "Invalid/Corrupted: $INVALID_IMAGES"
echo ""

if [ $INVALID_IMAGES -eq 0 ]; then
    echo "🎉 All OG images are valid and ready for social sharing!"
    exit 0
else
    echo "⚠️  Some images need fixing"
    exit 1
fi
