const axios = require("axios");
const fs = require("fs");
const path = require("path");
const ytSearch = require("yt-search");
const https = require("https");

function deleteAfterTimeout(filePath, timeout = 15000) {
  setTimeout(() => {
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (!err) {
          console.log(`✅ Deleted file: ${filePath}`);
        } else {
          console.error(`❌ Error deleting file: ${filePath}`);
        }
      });
    }
  }, timeout);
}

async function getAPIUrl() {
  try {
    console.log("🔄 Fetching API URL from JSON...");
    const response = await axios.get(
      "https://raw.githubusercontent.com/MR-MAHABUB-004/MAHABUB-BOT-STORAGE/refs/heads/main/APIURL.json"
    );
    if (response.data && response.data.YouTube) {
      return response.data.YouTube;
    } else {
      throw new Error("YouTube field not found in the JSON.");
    }
  } catch (error) {
    throw new Error("Failed to load API URL.");
  }
}

module.exports = {
  config: {
    name: "song",
    aliases: ["music"],
    version: "1.0",
    author: "‎MR᭄﹅ MAHABUB﹅ メꪜ",
    countDown: 5,
    role: 0,
    shortDescription: "mp3 song from YouTube",
    longDescription: "download mp3 song from YouTube using api",
    category: "user",
    guide: "{p}{n}song",
  },

  onStart: async function ({ api, event, args }) {
    if (args.length === 0) {
      return api.sendMessage(
        "⚠️ 𝗣𝗹𝗲𝗮𝘀𝗲 𝗽𝗿𝗼𝘃𝗶𝗱𝗲 𝗮 𝘀𝗼𝗻𝗴 𝗻𝗮𝗺𝗲 𝘁𝗼 𝘀𝗲𝗮𝗿𝗰𝗵.",
        event.threadID
      );
    }

    const songName = args.join(" ");

    try {
      const searchResults = await ytSearch(songName);
      if (!searchResults || !searchResults.videos.length) {
        throw new Error("𝗡𝗼 𝗿𝗲𝘀𝘂𝗹𝘁𝘀 𝗳𝗼𝘂𝗻𝗱 𝗳𝗼𝗿 𝘆𝗼𝘂𝗿 𝘀𝗲𝗮𝗿𝗰𝗵 𝗾𝘂𝗲𝗿𝘆.");
      }

      const topResult = searchResults.videos[0];
      const videoUrl = `https://www.youtube.com/watch?v=${topResult.videoId}`;

      const downloadDir = path.join(__dirname, "cache");
      if (!fs.existsSync(downloadDir)) {
        fs.mkdirSync(downloadDir, { recursive: true });
      }

      const safeTitle = topResult.title.replace(/[^a-zA-Z0-9]/g, "_");
      const downloadPath = path.join(downloadDir, `${safeTitle}.mp3`);

      const apiUrl = await getAPIUrl();
      const downloadApiUrl = `${apiUrl}/ytmp3?url=${encodeURIComponent(videoUrl)}`;

      const downloadResponse = await axios.get(downloadApiUrl);
      const downloadUrl = downloadResponse?.data?.download?.url;

      if (!downloadUrl) {
        throw new Error("𝗔𝗣𝗜 𝗱𝗶𝗱 𝗻𝗼𝘁 𝗿𝗲𝘁𝘂𝗿𝗻 𝗮 𝘃𝗮𝗹𝗶𝗱 𝗱𝗼𝘄𝗻𝗹𝗼𝗮𝗱 𝗨𝗥𝗟.");
      }

      const file = fs.createWriteStream(downloadPath);

      await new Promise((resolve, reject) => {
        https
          .get(downloadUrl.replace("http:", "https:"), (response) => {
            if (response.statusCode === 200) {
              response.pipe(file);
              file.on("finish", () => {
                file.close(resolve);
              });
            } else {
              reject(
                new Error(
                  `𝗙𝗮𝗶𝗹𝗲𝗱 𝘁𝗼 𝗱𝗼𝘄𝗻𝗹𝗼𝗮𝗱 𝗳𝗶𝗹𝗲. 𝗦𝘁𝗮𝘁𝘂𝘀 𝗰𝗼𝗱𝗲: ${response.statusCode}`
                )
              );
            }
          })
          .on("error", reject);
      });

      api.setMessageReaction("✅", event.messageID, () => {}, true);

      await api.sendMessage(
        {
          attachment: fs.createReadStream(downloadPath),
          body: `🎶 𝗧𝗶𝘁𝗹𝗲: ${topResult.title}`,
        },
        event.threadID,
        event.messageID
      );

      deleteAfterTimeout(downloadPath, 15000);
    } catch (error) {
      console.error(`❌ 𝗘𝗿𝗿𝗼𝗿: ${error.message}`);
      api.sendMessage(
        `❌ 𝗙𝗮𝗶𝗹𝗲𝗱: ${error.message}`,
        event.threadID,
        event.messageID
      );
    }
  },
};
