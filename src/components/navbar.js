const blessed = require('blessed');

module.exports = function Navbar(parent, colors, initialPage) {
  const tabs = ['home', 'projects', 'about', 'contact'];
  
  const container = blessed.box({
    parent: parent,
    top: 0,
    left: 0,
    width: '100%',
    height: 3,
    style: {
      bg: colors.bg,
      fg: colors.fg
    },
    border: {
      type: 'line',
      fg: colors.border
    }
  });

  const content = blessed.box({
    parent: container,
    top: 0,
    left: 1, // small padding
    width: '100%-4',
    height: 1,
    tags: true,
    style: {
      bg: colors.bg,
      fg: colors.fg
    }
  });

  function renderTabs(activeTab) {
    let str = '';
    tabs.forEach(tab => {
      if (tab === activeTab) {
        str += `{bold}{${colors.accent}-fg}[ ${tab} ]{/${colors.accent}-fg}{/bold}  `;
      } else {
        str += `[ ${tab} ]  `;
      }
    });
    content.setContent(str);
  }

  renderTabs(initialPage);

  return {
    updateActive: (newTab) => {
      renderTabs(newTab);
    },
    destroy: () => {
      container.destroy();
    }
  };
};
