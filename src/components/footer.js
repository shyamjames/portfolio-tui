const blessed = require('blessed');

module.exports = function Footer(parent, colors) {
  const container = blessed.box({
    parent: parent,
    bottom: 0,
    left: 0,
    width: '100%',
    height: 1,
    tags: true,
    content: `{right}←/h →/l: navigate · ↑/k ↓/j: select · q: quit  {/right}`,
    style: {
      bg: colors.highlightBg,
      fg: colors.fg
    }
  });

  return container;
};
