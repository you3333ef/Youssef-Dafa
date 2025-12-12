#!/bin/bash

# Script to test OG Meta Tags after deployment
# Usage: ./test-og-meta.sh <your-netlify-domain>

DOMAIN="${1:-melodic-squirrel-d354d7.netlify.app}"
BASE_URL="https://$DOMAIN"

echo "🧪 Testing OG Meta Tags on: $BASE_URL"
echo "================================================"
echo ""

# Test companies
COMPANIES=("aramex" "dhl" "fedex" "ups" "smsa" "empost" "qpost" "naqel" "zajil")

for COMPANY in "${COMPANIES[@]}"; do
    echo "Testing company: $COMPANY"
    echo "----------------------------------------"
    
    # Test URL
    TEST_URL="$BASE_URL/pay/test-id/recipient?company=$COMPANY&currency=SAR"
    
    # 1. Check headers
    echo "📋 Headers:"
    curl -s -I "$TEST_URL" | grep -i "x-dynamic-meta\|x-company-param\|x-image-url" || echo "  ⚠️ No custom headers found"
    
    # 2. Check OG image tag
    echo ""
    echo "🖼️ OG Image:"
    OG_IMAGE=$(curl -s "$TEST_URL" | grep -o 'property="og:image" content="[^"]*"' | head -1)
    if [ -n "$OG_IMAGE" ]; then
        echo "  ✅ $OG_IMAGE"
    else
        echo "  ❌ No og:image found!"
    fi
    
    # 3. Check OG title
    echo ""
    echo "📝 OG Title:"
    OG_TITLE=$(curl -s "$TEST_URL" | grep -o 'property="og:title" content="[^"]*"' | head -1)
    if [ -n "$OG_TITLE" ]; then
        echo "  ✅ $OG_TITLE"
    else
        echo "  ❌ No og:title found!"
    fi
    
    echo ""
    echo "================================================"
    echo ""
done

echo ""
echo "🎯 Testing with WhatsApp User-Agent:"
echo "================================================"
WHATSAPP_TEST_URL="$BASE_URL/pay/test-whatsapp/recipient?company=empost&currency=AED"
echo "URL: $WHATSAPP_TEST_URL"
echo ""

curl -s -H "User-Agent: WhatsApp/2.23.20.74" \
     -H "Accept: text/html" \
     "$WHATSAPP_TEST_URL" | \
     grep -E 'property="og:(image|title|description)"' | \
     head -5

echo ""
echo "================================================"
echo "✅ Test completed!"
echo ""
echo "To test manually:"
echo "1. Facebook Debugger: https://developers.facebook.com/tools/debug/"
echo "2. WhatsApp: Share a NEW link (not cached)"
echo "3. Check Netlify logs for: [Dynamic Meta] logs"
