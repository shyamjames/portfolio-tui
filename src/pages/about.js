const blessed = require('blessed');
const content = require('../data/content');

module.exports = function AboutPage(parent, colors, screen) {
  const container = blessed.box({
    parent: parent,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    style: { bg: colors.bg, fg: colors.fg }
  });

  // Left column: Bio
  blessed.box({
    parent: container,
    top: 0,
    left: 0,
    width: '50%',
    height: '100%',
    label: ` {${colors.accent}-fg}About Me{/${colors.accent}-fg} `,
    border: { type: 'line' },
    padding: { top: 1, left: 2, right: 2 },
    tags: true,
    content: content.bio + '\n\n',
    style: {
      bg: colors.bg,
      fg: colors.fg,
      border: { fg: colors.border }
    }
  });

  // Right column: Skills
  const rightCol = blessed.box({
    parent: container,
    top: 0,
    left: '50%',
    width: '50%',
    height: '100%',
    label: ` {${colors.accent}-fg}Skills{/${colors.accent}-fg} `,
    border: { type: 'line' },
    padding: { top: 1, left: 2, right: 2 },
    tags: true,
    style: {
      bg: colors.bg,
      fg: colors.fg,
      border: { fg: colors.border }
    }
  });

  let skillsStr = '';
  for (const [category, items] of Object.entries(content.skills)) {
    skillsStr += `{bold}${category}{/bold}\n`;
    items.forEach(item => {
      skillsStr += `  • ${item}\n`;
    });
    skillsStr += `\n`;
  }

  rightCol.setContent(skillsStr);

  return container;
};
