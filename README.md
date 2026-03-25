# SSH TUI Portfolio

A fully functional, modern terminal user interface portfolio served directly over SSH. Built with Node.js, `ssh2`, and `blessed`.

## Features
- **No client setup**: Visitors only need a standard SSH client (`ssh` command).
- **Interactive TUI**: Navigate between Home, Projects, About, and Contact pages using your keyboard.
- **Responsive**: Adapts to terminal resize events seamlessly.
- **Self-contained**: All portfolio content is managed in a single `src/data/content.js` file.

## Local Setup

1. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Generate SSH Host Key:**
   \`\`\`bash
   npm run generate-keys
   \`\`\`
   This creates a 2048-bit RSA key at `./host_key` used by the server to identify itself.

3. **Start the Server:**
   \`\`\`bash
   npm start
   \`\`\`

4. **Connect:**
   In another terminal, connect to the local server:
   \`\`\`bash
   ssh localhost -p 2222
   \`\`\`
   *(Note: Since this uses a custom `host_key`, SSH might warn you about connecting to a new host or if you reuse the port. You can use `ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null localhost -p 2222` to bypass local warnings).*

## Customization

Edit `src/data/content.js` to change your name, tagline, bio, projects, skills, and contact information. The layout automatically adapts to the contents.

## Deployment

To deploy this on a Linux VPS (like DigitalOcean, Linode, or AWS):

1. **Copy files to your server:**
   Clone your repo or `scp` the files over.
   
2. **Install Node.js & Dependencies:**
   Ensure Node.js is installed. Run `npm install` and `npm run generate-keys`.

3. **Run with PM2:**
   Install PM2 globally (`npm i -g pm2`) and start the app so it runs in the background and restarts on crash:
   \`\`\`bash
   pm2 start src/server.js --name "portfolio"
   \`\`\`

4. **Running on Port 22:**
   By default, the app listens on `2222`. To serve it on the default SSH port (`22`), you have a few options:
   
   - **Option A (Port Forwarding via iptables):**
     Forward traffic from 22 to 2222 (replace `eth0` with your interface name):
     \`\`\`bash
     sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 22 -j REDIRECT --to-port 2222
     \`\`\`
     *Note: Move your actual server's SSH daemon to another port (e.g., 2223) in `/etc/ssh/sshd_config` before doing this!*

   - **Option B (Authbind):**
     Use `authbind` to allow the node process to bind to port 22 without running as root.
     \`\`\`bash
     sudo apt install authbind
     sudo touch /etc/authbind/byport/22
     sudo chown $USER /etc/authbind/byport/22
     sudo chmod 755 /etc/authbind/byport/22
     \`\`\`
     Change `PORT = 22` in `src/server.js`, then start with:
     \`\`\`bash
     authbind --deep pm2 start src/server.js
     \`\`\`

5. **Point a Domain:**
   Create an `A` record in your DNS provider pointing `yourname.dev` to your VPS IP address. Visitors can then run `ssh yourname.dev`.

## UI Navigation Controls
- `Left/Right` or `h/l`: Switch tabs / pages
- `Up/Down` or `k/j`: Navigate lists (e.g. project selection)
- `q` or `Ctrl+C`: Quit the application
