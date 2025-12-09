#!/bin/bash
# Netlify Deployment Script
# استخدم هذا السكريبت للنشر على Netlify

cd /project/workspace/you3333ef/Youssef-Dafa

# Build the project
echo "Building project..."
npm run build

# Deploy to Netlify
echo "Deploying to Netlify..."
export NETLIFY_AUTH_TOKEN="nfp_goXTCjyixReXA3GkyjR9xngLVCZ5wwYSbc51"

netlify deploy \
  --prod \
  --dir=dist \
  --auth=$NETLIFY_AUTH_TOKEN

echo "Deployment complete!"
