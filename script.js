const commands = [

    // --- BASICS ---
    { cmd: "ls", desc: "Liste les fichiers du répertoire courant.", example: "ls -l" },
    { cmd: "cd", desc: "Change le répertoire courant.", example: "cd /var/log" },
    { cmd: "pwd", desc: "Affiche le chemin courant.", example: "pwd" },
    { cmd: "cat", desc: "Affiche le contenu d’un fichier.", example: "cat /etc/fstab" },
    { cmd: "less", desc: "Lecture page par page.", example: "less /var/log/messages" },
    { cmd: "cp", desc: "Copie des fichiers.", example: "cp fichier.txt /tmp/" },
    { cmd: "mv", desc: "Déplace ou renomme un fichier.", example: "mv test.log archive.log" },
    { cmd: "rm", desc: "Supprime un fichier.", example: "rm -f fichier.txt" },
    { cmd: "mkdir", desc: "Créer un dossier.", example: "mkdir /data/backup" },
    { cmd: "chmod", desc: "Change les permissions.", example: "chmod 750 script.sh" },
    { cmd: "chown", desc: "Change le propriétaire.", example: "chown user:group fichier" },

    // --- SYSTEM ---
    { cmd: "top", desc: "Affiche les processus en temps réel.", example: "top" },
    { cmd: "htop", desc: "Version améliorée de top.", example: "htop" },
    { cmd: "ps", desc: "Affiche les processus.", example: "ps aux | grep sshd" },
    { cmd: "kill", desc: "Termine un processus.", example: "kill -9 1234" },
    { cmd: "df", desc: "Espace disque disponible.", example: "df -h" },
    { cmd: "du", desc: "Taille des fichiers.", example: "du -sh /var/log" },
    { cmd: "free", desc: "Mémoire utilisée.", example: "free -m" },
    { cmd: "uname", desc: "Infos sur le kernel.", example: "uname -r" },
    { cmd: "systemctl", desc: "Gère les services systemd.", example: "systemctl status sshd" },
    { cmd: "journalctl", desc: "Logs système.", example: "journalctl -u nginx" },

    // --- NETWORK ---
    { cmd: "ip a", desc: "Affiche les interfaces réseau.", example: "ip a" },
    { cmd: "ss -lntp", desc: "Ports ouverts + processus.", example: "ss -lntp" },
    { cmd: "ping", desc: "Teste la connectivité.", example: "ping 8.8.8.8" },
    { cmd: "traceroute", desc: "Trace le chemin réseau.", example: "traceroute google.com" },
    { cmd: "dig", desc: "Query DNS avancé.", example: "dig A google.com" },
    { cmd: "curl", desc: "Requête HTTP.", example: "curl -I https://google.com" },

    // --- PACKAGES ---
    { cmd: "apt install", desc: "Installer un paquet Debian/Ubuntu.", example: "apt install nginx" },
    { cmd: "yum install", desc: "Installer un paquet RHEL/CentOS.", example: "yum install httpd" },
    { cmd: "dnf install", desc: "Gestionnaire moderne Fedora/RHEL.", example: "dnf install podman" },

    // --- DEVOPS / CONTAINERS ---
    { cmd: "docker ps", desc: "Liste les conteneurs Docker.", example: "docker ps -a" },
    { cmd: "docker logs", desc: "Logs d’un conteneur.", example: "docker logs nginx" },
    { cmd: "docker exec", desc: "Exécute dans un conteneur.", example: "docker exec -it nginx bash" },
    { cmd: "kubectl get pods", desc: "Liste les pods Kubernetes.", example: "kubectl get pods -A" },

    // --- STORAGE / LVM ---
    { cmd: "lsblk", desc: "Affiche les disques et partitions.", example: "lsblk -f" },
    { cmd: "pvcreate", desc: "Créer un physical volume.", example: "pvcreate /dev/sdb" },
    { cmd: "vgcreate", desc: "Créer un volume group.", example: "vgcreate data /dev/sdb" },
    { cmd: "lvcreate", desc: "Créer un logical volume.", example: "lvcreate -L 20G -n lvdata data" },
    { cmd: "mount", desc: "Monte un système de fichiers.", example: "mount /dev/mapper/data-lv /mnt" },

    // --- HPC COMMANDS ---
    { cmd: "sinfo", desc: "Affiche l'état du cluster Slurm.", example: "sinfo -N -l" },
    { cmd: "squeue", desc: "Liste les jobs en cours.", example: "squeue -u user" },
    { cmd: "sbatch", desc: "Soumet un job.", example: "sbatch job.slurm" },
    { cmd: "srun", desc: "Exécute une tâche interactive.", example: "srun --pty bash" },
    { cmd: "scancel", desc: "Annule un job.", example: "scancel 12345" },
    { cmd: "sacct", desc: "Historique des jobs exécutés.", example: "sacct -j 12345" },
    { cmd: "seff", desc: "Efficacité d’un job." , example: "seff 12345"},
    { cmd: "nfsstat", desc: "Diagnostique NFS client/serveur.", example: "nfsstat -c" },
    { cmd: "mdadm", desc: "Gère les RAID software.", example: "mdadm --detail /dev/md0" }
];


// --- GENERATION DES BLOCS ---
function generateCommands() {
    const container = document.getElementById("commands-container");
    container.innerHTML = "";

    commands.forEach(c => {
        container.innerHTML += `
            <div class="command-box">
                <div class="command-title">${c.cmd}</div>
                <div class="command-description">${c.desc}</div>
                <div class="command-example">$ ${c.example}</div>
            </div>
        `;
    });
}

// --- SEARCH ---
document.getElementById("search").addEventListener("input", function () {
    const q = this.value.toLowerCase();
    const container = document.getElementById("commands-container");
    container.innerHTML = "";

    commands
        .filter(c => c.cmd.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q))
        .forEach(c => {
            container.innerHTML += `
            <div class="command-box">
                <div class="command-title">${c.cmd}</div>
                <div class="command-description">${c.desc}</div>
                <div class="command-example">$ ${c.example}</div>
            </div>
        `;
        });
});

generateCommands();
