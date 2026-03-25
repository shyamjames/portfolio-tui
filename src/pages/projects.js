const blessed = require('blessed');
const content = require('../data/content');

module.exports = function ProjectsPage(parent, colors, screen) {
  const container = blessed.box({
    parent: parent,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    style: { bg: colors.bg, fg: colors.fg }
  });

  const projects = content.projects;

  // Left panel: List
  const listPanel = blessed.list({
    parent: container,
    top: 0,
    left: 0,
    width: '35%',
    height: '100%',
    keys: true,
    vi: true,
    mouse: true,
    border: { type: 'line' },
    style: {
      bg: colors.bg,
      fg: colors.fg,
      border: { fg: colors.border },
      selected: { bg: colors.highlightBg, fg: colors.accent, bold: true }
    },
    items: projects.map(p => ` ${p.name} `),
    scrollbar: {
      ch: ' ',
      track: { bg: colors.bg },
      style: { bg: colors.accent }
    }
  });

  // Right panel: Detail
  const detailPanel = blessed.box({
    parent: container,
    top: 0,
    left: '35%',
    width: '65%',
    height: '100%',
    border: { type: 'line' },
    padding: { top: 1, left: 2, right: 2, bottom: 1 },
    tags: true,
    style: {
      bg: colors.bg,
      fg: colors.fg,
      border: { fg: colors.border }
    }
  });

  listPanel.on('select item', (item, index) => {
    updateDetail(index);
  });

  // Since it's a TUI list, sometimes we need to capture keypress manually
  // mostly list will handle it via keys/vi if focused
  
  function updateDetail(index) {
    const p = projects[index];
    if (!p) return;

    const tags = p.tags.map(t => `{${colors.highlightBg}-bg} [${t}] {/${colors.highlightBg}-bg}`).join(' ');

    let contentStr = `{bold}{${colors.accent}-fg}${p.name}{/${colors.accent}-fg}{/bold}\n`;
    contentStr += `${p.shortDesc}\n\n`;
    contentStr += `─────\n\n`;
    contentStr += `${p.description}\n\n`;
    contentStr += `─────\n\n`;
    contentStr += `Tech Stack: ${tags}\n\n`;
    contentStr += `URL: {underline}${p.url}{/underline}`;

    detailPanel.setContent(contentStr);
    screen.render();
  }

  // Initialize
  if (projects.length > 0) {
    updateDetail(0);
  }

  // Focus list immediately so arrows work for selection
  listPanel.focus();

  return container;
};
