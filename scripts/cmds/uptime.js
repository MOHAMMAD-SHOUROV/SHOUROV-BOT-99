module.exports = {
  config: {
    name: 'up',
    aliases: ["uptime", "upt"],
    version: "1.0",
    author: "★𝐌𝟗𝐇𝟒𝐌𝐌𝟒𝐃-𝐁𝟒𝐃𝟗𝐋★",
    role: 0,
    shortDescription: {
      en: "uptime robot"
    },
    longDescription: {
      en: "Shows uptime of the bot."
    },
    category: "system-mbc",
    guide: {
      en: "Use {p}up to see uptime of bot."
    }
  },

  onStart: async function ({ message, threadsData }) {
    const os = require('os');

    const uptime = os.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    const now = new Date();
    const date = now.toLocaleDateString("en-US", {
      year: "numeric", month: "numeric", day: "numeric"
    });
    const time = now.toLocaleTimeString("en-US", {
      timeZone: "Asia/Dhaka",
      hour12: true
    });

    const ramUsed = Math.round(process.memoryUsage().rss / 1048576) + " MB";
    const totalRam = Math.round(os.totalmem() / 1073741824) + " GB";
    const freeRam = Math.round(os.freemem() / 1073741824) + " GB";

    const msg = `╔╝❮❮ 𝗨𝗣𝗧𝗜𝗠𝗘-𝗥𝗢𝗕𝗢𝗧 ❯❯╚╗

━❯ UPTIME: ${days} দিন, ${hours} ঘন্টা, ${minutes} মিনিট ${seconds} সেকেন্ড
━━━━━━━━━━━━━━━━━━━━━━
━❯ 𝐊𝐈𝐍𝐆 𝐒𝐇𝐎𝐔𝐑𝐎𝐕
━❯ BOT NAME: SHOUROV-BOT
━❯ PREFIX: 【/】
━❯ OS: ${os.platform()} ${os.release()}
━❯ CPU Cores: ${os.cpus().length}
━❯ Total Users: ${threadsData.size}
━❯ Total Threads: ${threadsData.size}
━❯ RAM Used: ${ramUsed}
━❯ Total RAM: ${totalRam}
━❯ Free RAM: ${freeRam}
━❯ Process Uptime: ${Math.floor(process.uptime())} seconds
━━━━━━━━━━━━━━━━━━━━━━
【 ${date} || ${time} 】`;

    try {
      const gifStream = await global.utils.getStreamFromURL("https://drive.google.com/uc?id=1rqM6BZINb1T-9RwPV6bhGs_nGpxxxFIl");

      message.reply({
        body: msg,
        attachment: gifStream
      });

    } catch (err) {
      message.reply("faild to load attachment but here is your information:\n\n" + msg);
    }
  }
};
