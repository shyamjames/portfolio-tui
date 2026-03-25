const blessed = require('blessed');
const Navbar = require('./components/navbar');
const Footer = require('./components/footer');
const HomePage = require('./pages/home');
const ProjectsPage = require('./pages/projects');
const AboutPage = require('./pages/about');
const ContactPage = require('./pages/contact');

function createApp(stream, client) {
  // Initialize the screen via the SSH stream
  const screen = blessed.screen({
    smartCSR: true,
    input: stream,
    output: stream,
    terminal: 'xterm-256color',
    cursor: {
      artificial: true,
      shape: 'block',
      blink: true,
      color: null
    }
  });

  // Use a dim white / muted green for highlights
  const colors = {
    bg: '#000000',
    fg: '#cccccc',
    accent: '#00ff9f',
    highlightBg: '#111111',
    border: '#333333'
  };

  // State
  let currentPage = 'home';
  let activePageBox = null;

  // Global layout wrapper
  const layout = blessed.box({
    parent: screen,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    style: {
      bg: colors.bg,
      fg: colors.fg
    }
  });

  // Pages map
  const pages = {
    home: HomePage,
    projects: ProjectsPage,
    about: AboutPage,
    contact: ContactPage
  };
  
  const pageKeys = Object.keys(pages);

  // Components
  const navbar = Navbar(layout, colors, currentPage);
  const footer = Footer(layout, colors);

  // Router logic
  function navigateTo(pageId) {
    if (!pages[pageId]) return;
    
    // Clean up previous page
    if (activePageBox) {
      layout.remove(activePageBox);
      activePageBox.destroy();
    }
    
    currentPage = pageId;
    
    // Create container for the new page
    // Leaves room for Navbar (top: 3) and Footer (bottom: 2 or height-2)
    activePageBox = blessed.box({
      parent: layout,
      top: 3,
      left: 0,
      width: '100%',
      height: '100%-5', // 3 from top + 2 from bottom
      style: {
        bg: colors.bg,
        fg: colors.fg
      }
    });

    // Render new page
    pages[pageId](activePageBox, colors, screen);
    
    // Update navbar active state
    navbar.updateActive(currentPage);
    
    screen.render();
  }

  // Global Navigation KeyBindings
  screen.key(['right', 'l'], () => {
    if (currentPage === 'projects') {
       // Let projects panel handle it if needed, or pass it
       // projects page might need left/right to move back to list.
       // Actually, tab-level nav is usually separate. Let's make right/l just cycle tabs
    }
    const idx = pageKeys.indexOf(currentPage);
    const nextIdx = (idx + 1) % pageKeys.length;
    navigateTo(pageKeys[nextIdx]);
  });

  screen.key(['left', 'h'], () => {
    const idx = pageKeys.indexOf(currentPage);
    const prevIdx = (idx - 1 + pageKeys.length) % pageKeys.length;
    navigateTo(pageKeys[prevIdx]);
  });

  screen.key(['q', 'C-c'], () => {
    // Show farewell message before quitting
    if (activePageBox) {
      activePageBox.destroy();
    }
    const farewell = blessed.box({
      parent: layout,
      top: 'center',
      left: 'center',
      width: 40,
      height: 5,
      content: `{center}Thanks for visiting.\n{${colors.accent}-fg}Disconnecting...{/${colors.accent}-fg}{/center}`,
      tags: true,
      border: { type: 'line' },
      style: {
        bg: colors.bg,
        fg: colors.fg,
        border: { fg: colors.accent }
      }
    });
    screen.render();
    
    setTimeout(() => {
      screen.destroy();
    }, 1000);
  });

  // Initial render
  navigateTo('home');

  return screen;
}

module.exports = { createApp };
