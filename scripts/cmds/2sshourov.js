const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "emojiVideo",
  version: "1.0.1",
  hasPermission: 0,
  credits: "Modified by ChatGPT & Shourov",
  description: "Send a random video when emoji is sent",
  commandCategory: "media",
  usages: "[emoji]",
  cooldowns: 5
};

module.exports.handleEvent = async ({ api, event }) => {
  const allowedEmojis = [
    "😀","😃","😄","😁","😆","😅","🤣","😂","🙂","🙃","😉","😊","😇","🥰","😍","🤩","😘","😗","☺️","😚","😙",
    "😋","😛","😜","🤪","😝","🤑","🤗","🤭","🫢","🫣","🤫","🤔","🫡","🤐","🤨","😐","😑","😶","🫥","😶‍🌫️","😏",
    "😒","🙄","😬","😮‍💨","🤥","😌","😔","😪","🤤","😴","😷","🤒","🤕","🤢","🤮","🤧","🥶","🥴","😵","😵‍💫",
    "🤯","🤠","🥳","🥸","😎","🤓","🧐","😕","🫤","😟","🙁","☹️","😮","😯","😲","😳","🥺","🥹","😦","😧",
    "😨","😰","😱","😖","😣","😞","😓","😩","😫","🥱","😤","😡","😠","💀","☠️","💩","🤡","👹","👺","👻","👽",
    "👾","🤖","😺","😸","😹","😻","😼","😽","🙀","😿","🙈","🙉","🙊","💋","💌","💘","💝","💖","💗","💓","💕",
    "❣️","💔","❤️‍🔥","❤️‍🩹","❤️","🧡","💛","💚","💯","💢","💥","💫","💦","💨","✊"
  ];

  const message = event.body.trim();
  if (!allowedEmojis.includes(message)) return;

  const videoIds = [
    "1FYLpzM2b9KbrOuZoi5k1wKnXjGcBRlXX",
    "1FX8S7agOjoIWnDH01l8cS2-TPIwpfOqI",
    "1Fw5cPHvT-wnrSuO1ap6KEJl_2NGuGpE8",
    "1FTqJH6IORfcX2xHWqaPnPKzCa6TuuiPV",
    "1FmH5aTnARtqZTryA97OiUlCfFYObcEYP",
    "1FQBiObk515JFq5FWyUEOxhvETdUOIksa",
    "1FeojyFT1EPAl7xZcROHJ_uu7IviNG4Lc",
    "1FlnhvrlgRVpQeqHUfFJKtFCmFCcEuEso",
    "1FL4yaE1we0qY-lX-bgud-dvql306Dwf2"
  ];

  const randomId = videoIds[Math.floor(Math.random() * videoIds.length)];
  const videoUrl = `https://drive.google.com/uc?export=download&id=${randomId}`;
  const filePath = path.join(__dirname, "temp_emoji_video.mp4");

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
          body: "সবই সুন্দর আমি ছাড়া 💔-𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
          attachment: fs.createReadStream(filePath)
        },
        event.threadID,
        () => fs.unlinkSync(filePath),
        event.messageID
      );
    });

    writer.on("error", () => {
      api.sendMessage("⚠️ ভিডিও ডাউনলোড করতে সমস্যা হয়েছে!", event.threadID);
    });

  } catch (error) {
    api.sendMessage("❌ ভিডিও পাঠাতে সমস্যা হয়েছে!", event.threadID);
    console.error(error);
  }
};

module.exports.run = () => {};