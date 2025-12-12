#!/bin/bash

# Script to automatically set VITE_PRODUCTION_DOMAIN on Netlify
# This script will detect the domain and set it as an environment variable

echo "🔧 Setting up VITE_PRODUCTION_DOMAIN environment variable..."
echo ""

# Method 1: Using Netlify CLI (Recommended)
if command -v netlify &> /dev/null; then
    echo "✅ Netlify CLI found"
    
    # Get the site info
    SITE_URL=$(netlify status --json 2>/dev/null | grep -o '"url":"[^"]*"' | cut -d'"' -f4)
    
    if [ -n "$SITE_URL" ]; then
        echo "📡 Detected site URL: $SITE_URL"
        
        # Set the environment variable
        netlify env:set VITE_PRODUCTION_DOMAIN "$SITE_URL"
        
        if [ $? -eq 0 ]; then
            echo "✅ VITE_PRODUCTION_DOMAIN set to: $SITE_URL"
            echo ""
            echo "🎉 Success! The environment variable has been set."
            echo "⚠️  You need to trigger a new deploy for changes to take effect."
            exit 0
        else
            echo "❌ Failed to set environment variable"
            exit 1
        fi
    else
        echo "⚠️  Could not detect site URL automatically"
    fi
else
    echo "⚠️  Netlify CLI not found"
    echo ""
    echo "To install Netlify CLI:"
    echo "  npm install -g netlify-cli"
    echo ""
fi

# Method 2: Manual instructions
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 Manual Setup Instructions:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Go to your Netlify Dashboard"
echo "2. Select your site"
echo "3. Go to: Site Settings → Environment Variables"
echo "4. Click 'Add a variable'"
echo "5. Set:"
echo "   Key:   VITE_PRODUCTION_DOMAIN"
echo "   Value: https://your-site-name.netlify.app"
echo ""
echo "   (Replace 'your-site-name' with your actual Netlify site name)"
echo ""
echo "6. Save and trigger a new deploy"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Method 3: Using Netlify API (if site ID is known)
echo "Or use Netlify API:"
echo ""
echo "curl -X POST https://api.netlify.com/api/v1/accounts/ACCOUNT_ID/env \\"
echo "  -H 'Authorization: Bearer YOUR_NETLIFY_TOKEN' \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{"
echo "    \"key\": \"VITE_PRODUCTION_DOMAIN\","
echo "    \"values\": ["
echo "      {"
echo "        \"value\": \"https://your-site-name.netlify.app\","
echo "        \"context\": \"all\""
echo "      }"
echo "    ]"
echo "  }'"
echo ""
