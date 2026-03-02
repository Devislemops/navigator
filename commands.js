const categories = {
    "Systemd": [
        { cmd: "systemctl status <service>", desc: "Check service status" },
        { cmd: "systemctl restart <service>", desc: "Restart a service" },
        { cmd: "journalctl -u <service>", desc: "Show logs for a service" }
    ],

    "Users & Groups": [
        { cmd: "id <user>", desc: "Display user info" },
        { cmd: "getent passwd <user>", desc: "Check if a user exists" },
        { cmd: "groups <user>", desc: "List groups of a user" }
    ],

    "LVM": [
        { cmd: "lvdisplay", desc: "Show logical volumes" },
        { cmd: "vgextend <vg> <disk>", desc: "Add disk to volume group" },
        { cmd: "lvextend -r -L +5G <lv>", desc: "Extend logical volume + filesystem" }
    ],

    "NFS": [
        { cmd: "nfsstat -c", desc: "Show NFS client stats" },
        { cmd: "mount | grep nfs", desc: "List NFS mounts" },
        { cmd: "showmount -e <server>", desc: "Display exported directories" }
    ],

    "Network": [
        { cmd: "ss -lntp", desc: "List active listening ports" },
        { cmd: "ip addr show", desc: "Show network interfaces" },
        { cmd: "ping -c 4 <host>", desc: "Ping a host" }
    ],

    "Slurm": [
        { cmd: "sinfo", desc: "Show cluster state" },
        { cmd: "squeue -u <user>", desc: "List user jobs" },
        { cmd: "scancel <jobid>", desc: "Cancel a job" }
    ]
};

function loadMenu() {
    const menu = document.getElementById("menu");
    Object.keys(categories).forEach(cat => {
        const btn = document.createElement("button");
        btn.textContent = cat;
        btn.onclick = () => loadCategory(cat);
        menu.appendChild(btn);
    });
}

function loadCategory(category) {
    const content = document.getElementById("content");
    content.innerHTML = `<h2>${category}</h2>`;

    categories[category].forEach(item => {
        const block = document.createElement("div");
        block.className = "command-block";

        block.innerHTML = `
            <button class="copy-btn" onclick="copyText(\`${item.cmd}\`)">Copy</button>
            <h3>${item.desc}</h3>
            <pre>${item.cmd}</pre>
        `;

        content.appendChild(block);
    });
}

function copyText(text) {
    navigator.clipboard.writeText(text);
    alert("Command copied!");
}

loadMenu();
