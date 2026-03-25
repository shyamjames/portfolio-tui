const blessed = require('blessed');
const content = require('../data/content');

module.exports = function HomePage(parent, colors, screen) {
  const container = blessed.box({
    parent: parent,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    style: {
      bg: colors.bg,
      fg: colors.fg
    }
  });

  // ASCII art generated with standard figlet font
  const asciiName = `
 __     __               _   _                     
 \\ \\   / /              | \\ | |                    
  \\ \\_/ /__  _   _ _ __ |  \\| | __ _ _ __ ___   ___ 
   \\   / _ \\| | | | '__|| . \` |/ _\` | '_ \` _ \\ / _ \\
    | | (_) | |_| | |   | |\\  | (_| | | | | | |  __/
    |_|\\___/ \\__,_|_|   |_| \\_|\\__,_|_| |_| |_|\\___|
  `;

  blessed.box({
    parent: container,
    top: 3,
    left: 'center',
    width: 60,
    height: 9,
    content: `{${colors.accent}-fg}${asciiName}{/${colors.accent}-fg}`,
    tags: true,
    style: { bg: colors.bg }
  });

  blessed.box({
    parent: container,
    top: 13,
    left: 'center',
    width: 60,
    height: 1,
    content: `{center}{bold}${content.tagline}{/bold}{/center}`,
    tags: true,
    style: { bg: colors.bg, fg: colors.fg }
  });

  blessed.box({
    parent: container,
    top: 16,
    left: 'center',
    width: 60,
    height: 5,
    content: `{center}${content.welcome}{/center}`,
    tags: true,
    style: { bg: colors.bg, fg: colors.fg }
  });

  return container;
};
