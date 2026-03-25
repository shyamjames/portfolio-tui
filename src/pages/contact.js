const blessed = require('blessed');
const content = require('../data/content');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

module.exports = function ContactPage(parent, colors, screen) {
  const container = blessed.box({
    parent: parent,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    style: { bg: colors.bg, fg: colors.fg }
  });

  const box = blessed.box({
    parent: container,
    top: 'center',
    left: 'center',
    width: '80%',
    height: '80%',
    border: { type: 'line' },
    label: ` {${colors.accent}-fg}Contact{/${colors.accent}-fg} `,
    padding: { top: 2, left: 4 },
    tags: true,
    style: {
      bg: colors.bg,
      fg: colors.fg,
      border: { fg: colors.border }
    }
  });

  let contentStr = `{bold}${content.contact.message}{/bold}\n\n\n`;

  content.contact.methods.forEach(m => {
    contentStr += `${m.icon}  {bold}${m.text}:{/bold}  {underline}${m.target}{/underline}\n\n`;
  });

  // Add SSH host fingerprint for flavor
  let fingerprint = 'unknown';
  try {
    const keyPath = path.join(__dirname, '..', '..', 'host_key.pub');
    if (fs.existsSync(keyPath)) {
      // Get the pubkey. ssh-keygen outputs both when generating without N.
      // Wait, ssh-keygen creates host_key and host_key.pub
      fingerprint = execSync(`ssh-keygen -lf "${keyPath}"`).toString().trim().split(' ')[1];
    }
  } catch(e) {
    // Ignore error
  }

  contentStr += `\n\n\n{dim}${content.contact.fingerprintLine}${fingerprint}{/dim}`;

  box.setContent(contentStr);

  return container;
};
