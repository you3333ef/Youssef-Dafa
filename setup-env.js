#!/usr/bin/env node

/**
 * Netlify Environment Variable Setup Script
 * Automatically detects and sets VITE_PRODUCTION_DOMAIN
 */

const https = require('https');
const { execSync } = require('child_process');

console.log('🔧 Netlify Environment Variable Setup');
console.log('=====================================\n');

// Try to get site URL from Netlify CLI
function getSiteUrlFromCLI() {
  try {
    const output = execSync('netlify status --json', { encoding: 'utf-8' });
    const data = JSON.parse(output);
    return data.siteUrl || data.url;
  } catch (error) {
    return null;
  }
}

// Try to get site name from netlify.toml or package.json
function detectSiteName() {
  try {
    const fs = require('fs');
    const path = require('path');
    
    // Check netlify.toml
    const tomlPath = path.join(__dirname, 'netlify.toml');
    if (fs.existsSync(tomlPath)) {
      const toml = fs.readFileSync(tomlPath, 'utf-8');
      const match = toml.match(/site_id\s*=\s*"([^"]+)"/);
      if (match) {
        console.log('✅ Found site ID in netlify.toml');
        return match[1];
      }
    }
    
    // Check package.json for scripts with domain
    const pkgPath = path.join(__dirname, 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      if (pkg.netlify && pkg.netlify.site) {
        console.log('✅ Found site info in package.json');
        return pkg.netlify.site;
      }
    }
  } catch (error) {
    return null;
  }
}

// Main function
async function main() {
  // Try Netlify CLI
  const siteUrl = getSiteUrlFromCLI();
  
  if (siteUrl) {
    console.log(`✅ Detected site URL: ${siteUrl}\n`);
    console.log('To set the environment variable, run:');
    console.log(`\n  netlify env:set VITE_PRODUCTION_DOMAIN "${siteUrl}"\n`);
    console.log('Or manually set it in Netlify Dashboard:\n');
  } else {
    console.log('⚠️  Could not auto-detect site URL\n');
  }
  
  // Show manual instructions
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📝 Manual Setup Instructions:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('1. Go to Netlify Dashboard: https://app.netlify.com');
  console.log('2. Select your site');
  console.log('3. Navigate to: Site Settings → Environment Variables');
  console.log('4. Click "Add a variable"');
  console.log('5. Enter:\n');
  console.log('   Key:   VITE_PRODUCTION_DOMAIN');
  console.log('   Value: https://your-site-name.netlify.app\n');
  console.log('   (Replace with your actual site URL)');
  console.log('\n6. Click "Save"');
  console.log('7. Trigger a new deploy\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  // Alternative method using .env file for local development
  console.log('💡 For local development:');
  console.log('\nCreate a .env file with:');
  console.log('VITE_PRODUCTION_DOMAIN=http://localhost:8080\n');
}

main().catch(console.error);
