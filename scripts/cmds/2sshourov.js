const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "emojiVideo",
  version: "1.0.1",
  hasPermission: 0,
  credits: "Modified by ChatGPT",
  description: "Send a video if emoji is sent",
  commandCategory: "media",
  usages: "[emoji]",
  cooldowns: 5
};

module.exports.handleEvent = async ({ api, event }) => {
  const allowedEmojis = [
    "ðŸ˜€","ðŸ˜ƒ","ðŸ˜„","ðŸ˜","ðŸ˜†","ðŸ˜…","ðŸ¤£","ðŸ˜‚","ðŸ™‚","ðŸ™ƒ","ðŸ˜‰","ðŸ˜Š","ðŸ˜‡","ðŸ¥°","ðŸ˜","ðŸ¤©","ðŸ˜˜","ðŸ˜—","â˜ºï¸","ðŸ˜š","ðŸ˜™"
  ];

  const message = event.body.trim();
  if (!allowedEmojis.includes(message)) return;

  const videoId = "1FEWwlnA_hKaiPHFW9Wc33b0il9bfRygU";
  const videoUrl = `https://drive.google.com/uc?export=download&id=${videoId}`;
  const filePath = path.join(__dirname, "emoji_video.mp4");

  try {
    const response = await axios({
      method: "GET",
      url: videoUrl,
      responseType: "stream"
    });

    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    writer.on("finish", () => {
      api.sendMessage(
        {
          body: "ðŸŽ¬ à¦à¦‡ à¦¨à¦¿à¦¨ à¦†à¦ªà¦¨à¦¾à¦° à¦­à¦¿à¦¡à¦¿à¦“:",
          attachment: fs.createReadStream(filePath)
        },
        event.threadID,
        () => fs.unlinkSync(filePath),
        event.messageID
      );
    });

    writer.on("error", () => {
      api.sendMessage("âš ï¸ à¦­à¦¿à¦¡à¦¿à¦“ à¦ªà¦¾à¦ à¦¾à¦¤à§‡ à¦¸à¦®à¦¸à§à¦¯à¦¾ à¦¹à§Ÿà§‡à¦›à§‡!", event.threadID);
    });

  } catch (error) {
    api.sendMessage("âŒ à¦­à¦¿à¦¡à¦¿à¦“ à¦¡à¦¾à¦‰à¦¨à¦²à§‹à¦¡ à¦•à¦°à¦¤à§‡ à¦¸à¦®à¦¸à§à¦¯à¦¾ à¦¹à§Ÿà§‡à¦›à§‡!", event.threadID);
    console.error(error);
  }
};

module.exports.run = () => {};