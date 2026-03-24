#!/usr/bin/env node

/**
 * JWT Secret Generator for GUMLA-GADI
 * Run this script to generate a secure JWT_SECRET for production
 */

const crypto = require('crypto');

function generateJWTSecret() {
    const secret = crypto.randomBytes(32).toString('hex');
    return secret;
}

function main() {
    console.log('\n🔐 GUMLA-GADI JWT Secret Generator\n');
    console.log('═══════════════════════════════════════════════════════════════\n');
    
    const newSecret = generateJWTSecret();
    
    console.log('✅ Generated Strong JWT_SECRET:\n');
    console.log(`${newSecret}\n`);
    
    console.log('═══════════════════════════════════════════════════════════════\n');
    
    console.log('📋 NEXT STEPS:\n');
    console.log('1️⃣  Copy the secret above (select and copy)\n');
    
    console.log('2️⃣  Go to Render Dashboard:\n');
    console.log('    - Navigate to your backend service\n');
    console.log('    - Click "Settings"\n');
    console.log('    - Scroll to "Environment"\n');
    console.log('    - Find or create variable named: JWT_SECRET\n');
    console.log('    - Paste the secret above\n');
    console.log('    - Click "Save"\n');
    
    console.log('3️⃣  Your backend will auto-redeploy with new secret\n');
    
    console.log('4️⃣  Test locally before pushing (optional):\n');
    console.log('    - Update .env file with new JWT_SECRET\n');
    console.log('    - Run: npm start\n');
    console.log('    - Test login/signup functionality\n');
    
    console.log('═══════════════════════════════════════════════════════════════\n');
    
    console.log('⚠️  IMPORTANT:\n');
    console.log('   • Keep this secret safe - never share it\n');
    console.log('   • Never commit it to GitHub\n');
    console.log('   • Use different secret for production (Render)\n');
    console.log('   • Rotate secrets periodically\n');
    
    console.log('═══════════════════════════════════════════════════════════════\n');
}

main();
