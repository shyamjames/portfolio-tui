const ssh2 = require('ssh2');
const fs = require('fs');
const path = require('path');
const { createApp } = require('./app');

const PORT = 2222;
const HOST_KEY_PATH = path.join(__dirname, '..', 'host_key');

// Ensure host key exists
if (!fs.existsSync(HOST_KEY_PATH)) {
  console.error("Host key not found! Run 'npm run generate-keys' first.");
  process.exit(1);
}

const server = new ssh2.Server({
  hostKeys: [fs.readFileSync(HOST_KEY_PATH)]
}, (client) => {
  console.log('Client connected!');

  // Handle authentication (accept all)
  client.on('authentication', (ctx) => {
    ctx.accept();
  });

  // Handle session start
  client.on('ready', () => {
    console.log('Client authenticated!');

    client.on('session', (accept, reject) => {
      const session = accept();
      let streamRows = 24;
      let streamCols = 80;
      
      session.on('pty', (accept, reject, info) => {
        streamRows = info.rows;
        streamCols = info.cols;
        accept(); // Accept pseudo-terminal request
      });

      session.on('shell', (accept, reject) => {
        const stream = accept();
        
        // Setup stream as TTY for blessed
        stream.isTTY = true;
        stream.rows = streamRows;
        stream.columns = streamCols;

        // Create the app (blessed screen) attached to this SSH stream
        const screen = createApp(stream, client);

        // Handle terminal resize events
        session.on('window-change', (accept, reject, info) => {
          if (info && info.rows && info.cols) {
            stream.rows = info.rows;
            stream.columns = info.cols;
            stream.emit('resize');
            // Some blessed versions require manual resize triggering sometimes
            // Though blessed's stream wrapper handles it usually if streams implement resize
          }
          if (accept) accept();
        });

        // Cleanup when screen is destroyed or stream closes
        screen.on('destroy', () => {
          stream.end();
          client.end();
        });

        stream.on('close', () => {
           if (!screen.destroyed) screen.destroy();
        });
      });
    });
  });

  client.on('end', () => {
    console.log('Client disconnected');
  });

  client.on('error', (err) => {
    console.error('Client error:', err);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`SSH Portfolio server listening on port ${PORT}`);
  console.log(`Test with: ssh localhost -p ${PORT}`);
});
