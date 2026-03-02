// MATRIX EFFECT
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "01";
const fontSize = 16;
const columns = canvas.width / fontSize;
let drops = Array.from({length: columns}, () => 1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0F0";
  ctx.font = fontSize + "px monospace";

  drops.forEach((y, i) => {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, y * fontSize);
    drops[i] = y * fontSize > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
  });
}

setInterval(drawMatrix, 35);

// COMMANDS DATABASE
const commandsDB = [
  {category: "Basics", cmd: "ls -la", desc: "List files/directories with details", example: "ls -la"},
  {category: "Basics", cmd: "cd /path", desc: "Change directory", example: "cd /var/log"},
  {category: "Files", cmd: "cp -r src dest", desc: "Copy directory recursively", example: "cp -r /etc /backup"},
  {category: "Files", cmd: "mv file newfile", desc: "Rename or move file", example: "mv index.html index.bak"},
  {category: "Files", cmd: "rm -rf dir", desc: "Remove directory forcefully", example: "rm -rf /tmp/testdir"},
  {category: "Networking", cmd: "ip a", desc: "List IP addresses", example: "ip a"},
  {category: "Networking", cmd: "ping google.com", desc: "Test connectivity", example: "ping -c 4 google.com"},
  {category: "SSH", cmd: "ssh user@host", desc: "Connect via SSH", example: "ssh benmeddah@server1"},
  {category: "SSH", cmd: "scp file user@host:path", desc: "Copy file over SSH", example: "scp file.txt server:/tmp"},
  {category: "Monitoring", cmd: "top", desc: "Interactive process viewer", example: "top"},
  {category: "Monitoring", cmd: "free -h", desc: "Show memory usage", example: "free -h"},
  {category: "Monitoring", cmd: "df -h", desc: "Show disk usage", example: "df -h"},
  {category: "Text", cmd: "grep 'pattern' file", desc: "Search text in file", example: "grep error /var/log/syslog"},
  {category: "Text", cmd: "awk '{print $1}' file", desc: "Print first column", example: "awk '{print $1}' /etc/passwd"},
  {category: "Security", cmd: "ufw status", desc: "Firewall status", example: "ufw status verbose"},
  {category: "DevOps", cmd: "git status", desc: "Show Git status", example: "git status"},
  {category: "DevOps", cmd: "git pull", desc: "Pull latest changes", example: "git pull origin main"},
  {category: "HPC", cmd: "sinfo", desc: "Show SLURM cluster state", example: "sinfo"},
  {category: "HPC", cmd: "squeue -u <user>", desc: "List user jobs", example: "squeue -u islem"}
];

// RENDER COMMANDS
const container = document.getElementById("commandsContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

function renderCommands() {
  container.innerHTML = "";
  const query = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  const filtered = commandsDB.filter(cmd => 
    (category === "All" || cmd.category === category) &&
    (cmd.cmd.toLowerCase().includes(query) || cmd.desc.toLowerCase().includes(query))
  );

  filtered.forEach(cmd => {
    const card = document.createElement("div");
    card.className = "cmd-card";
    card.innerHTML = `
      <h3>${cmd.cmd}</h3>
      <p class="desc">${cmd.desc}</p>
      <pre class="example">${cmd.example}</pre>
      <button class="copy-btn">Copy</button>
    `;
    card.querySelector(".copy-btn").onclick = () => {
      navigator.clipboard.writeText(cmd.example);
      card.querySelector(".copy-btn").innerText = "Copied!";
      setTimeout(() => card.querySelector(".copy-btn").innerText = "Copy", 1000);
    };
    container.appendChild(card);
  });
}

// INITIAL RENDER
renderCommands();

// EVENTS
searchInput.addEventListener("input", renderCommands);
categoryFilter.addEventListener("change", renderCommands);
