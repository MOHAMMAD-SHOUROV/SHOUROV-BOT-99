const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "『[✰MAHABUB💌』"; // don't change name

module.exports = {
  config: {
    name: "help",
    version: "1.17",
    author: " MR᭄﹅ MAHABUB﹅ メꪜ", // original author
    countDown: 0,
    role: 0,
    shortDescription: {
      en: "View command usage and list all commands directly",
    },
    longDescription: {
      en: "View command usage and list all commands directly",
    },
    category: "info",
    guide: {
      en: "{pn} / help cmdName ",
    },
    priority: 1,
  },

  onStart: async function ({ message, args, event, threadsData, role }) {
    const { threadID } = event;
    const threadData = await threadsData.get(threadID);
    const prefix = getPrefix(threadID);

    if (args.length === 0) {
      const categories = {};
      let msg = "";

      msg += `╔═════▓࿇࿇▓═════╗\n             𝐀𝐋𝐋 𝐂𝐌𝐃 𝐋𝐈𝐒𝐓 𝗜𝗡 𝐊𝐈𝐍𝐆 𝐒𝐇𝐎𝐔𝐑𝐎𝐕-𝗕𝗢𝗧\n╚═════▓࿇࿇▓═════╝\n\n`;

      for (const [name, value] of commands) {
        if (value.config.role > 1 && role < value.config.role) continue;
        const category = value.config.category || "Uncategorized";
        categories[category] = categories[category] || { commands: [] };
        categories[category].commands.push(name);
      }

      Object.keys(categories).forEach((category) => {
        if (category !== "info") {
          msg += `\n➪ ༆─☞︎︎︎ [${category.toUpperCase()}] 》👑`;
          const names = categories[category].commands.sort();
          for (let i = 0; i < names.length; i += 3) {
            const cmds = names.slice(i, i + 3).map((item) => ` ✯${item}|\n`);
            msg += `\n ${cmds.join(" ".repeat(Math.max(1, 10 - cmds.join("").length)))}`;
          }
        }
      });

      const totalCommands = commands.size;
      msg += `\n𝗧𝗢𝗧𝗔𝗟 𝙲𝚖𝚍 ${totalCommands}\n𝚌𝚘𝚖𝚖𝚊𝚗𝚍𝚜 𝚢𝚘𝚞 𝚌𝚊𝚗 𝚞𝚜𝚎 𝙼𝚊𝚑𝚊𝚋𝚞𝚋-𝙱𝚘𝚝 -`;
      msg += `𝚝𝚢𝚙𝚎: 「${prefix} 𝗵𝗲𝗹𝗽」+「 𝐇𝐄𝐋𝐏 𝐂𝐌𝐃」𝚝𝚘 𝚟𝚒𝚎𝚠 𝚍𝚎𝚝𝚊𝚒𝚕𝚜 𝚘𝚏 𝚌𝚘𝚖𝚖𝚊𝚗𝚍𝚜\n`;
      msg += `👑 | 𝐓𝐇𝐀𝐍𝐊𝐒 𝐅𝐎𝐑 𝐔𝐒𝐈𝐍𝐆 𝐊𝐈𝐍𝐆 𝐒𝐇𝐎𝐔𝐑𝐎𝐕-𝐁𝐎𝐓 𝐖𝐄'𝐋𝐋 𝐂𝐎𝐌𝐄 𝐖𝐈𝐓𝐇 𝐍𝐄𝐖 𝐔𝐏𝐃𝐀𝐓𝐄 𝐄𝐕𝐄𝐑𝐘 𝐖𝐄𝐄𝐊`;

      // Get video from API
      const res = await axios.get("https://mahabub-apis.vercel.app/help");
      const helpVideo = res.data.data;

      await message.reply({
        body: msg,
        attachment: await global.utils.getStreamFromURL(helpVideo),
      });

    } else {
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.get(aliases.get(commandName));

      if (!command) {
        await message.reply(`Command "${commandName}" not found.`);
      } else {
        const configCommand = command.config;
        const roleText = roleTextToString(configCommand.role);
        const author = configCommand.author || "Unknown";
        const longDescription = configCommand.longDescription ? configCommand.longDescription.en || "No description" : "No description";
        const guideBody = configCommand.guide?.en || "No guide available.";
        const usage = guideBody
          .replace(/{p}/g, prefix)
          .replace(/{n}/g, configCommand.name)
          .replace(/{pn}/g, prefix + configCommand.name);

        const response = `╭── 𝐍𝐀𝐌𝐄 𝐎𝐖𝐍𝐄𝐑 - 𝐊𝐈𝐍𝐆 𝐒𝐇𝐎𝐔𝐑𝐎𝐕 ────⭓
  │ ${configCommand.name}
  ├── INFO
  │ Description: ${longDescription}
  │ Other names: ${configCommand.aliases ? configCommand.aliases.join(", ") : "Do not have"}
  │ Version: ${configCommand.version || "1.0"}
  │ Role: ${roleText}
  │ Time per command: ${configCommand.countDown || 1}s
  │ Author: ${author}
  ├── Usage
  │ ${usage}
  ├── Notes
  │ THIS BOT HAS BEEN MADE BY MR᭄﹅ MAHABUB﹅ メꪜ
  │ FOR ANY HELP YOU CAN CONTACT OWNER: https://www.facebook.com/www.xsxx.com365
  ╰━━━━━━━❖`;

        await message.reply(response);
      }
    }
  },
};

function roleTextToString(roleText) {
  switch (roleText) {
    case 0: return "0 (All users)";
    case 1: return "1 (Group administrators)";
    case 2: return "2 (Admin bot)";
    default: return "Unknown role";
  }
}
