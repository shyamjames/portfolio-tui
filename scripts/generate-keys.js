const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const keyPath = path.join(__dirname, '..', 'host_key');

if (fs.existsSync(keyPath)) {
  console.log('Host key already exists at', keyPath);
  process.exit(0);
}

console.log('Generating new SSH host key...');
try {
  // Generate a 2048-bit RSA key without a passphrase
  execSync(`ssh-keygen -t rsa -b 2048 -f "${keyPath}" -N "" -q`, { stdio: 'inherit' });
  console.log('Successfully generated host key at', keyPath);
} catch (error) {
  console.error('Failed to generate host key:', error.message);
  process.exit(1);
}
