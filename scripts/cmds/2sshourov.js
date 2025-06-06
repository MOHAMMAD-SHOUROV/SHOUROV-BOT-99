const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "emojiVideo",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Shourov",
  description: "Send video if matching emoji is sent",
  commandCategory: "media",
  usages: "[emoji]",
  cooldowns: 5
};

module.exports.handleEvent = async ({ api, event }) => {
  const allowedEmojis = ["😎", "😍", "🔥","👻"," 🌺","🖤","💔","❤️","😘","🥲",😁","☺️","😅","🙂","💥","💦","💖","💌"]; // এখানেই আপনি ইমোজি বসাবেন
  const message = event.body.trim();

  if (allowedEmojis.includes(message)) {
    const videoUrl = "https://drive.google.com/file/d/1FEWwlnA_hKaiPHFW9Wc33b0il9bfRygU/view?usp=drivesdk","https://drive.google.com/file/d/1FL4yaE1we0qY-lX-bgud-dvql306Dwf2/view?usp=drivesdk","https://drive.google.com/file/d/1FlnhvrlgRVpQeqHUfFJKtFCmFCcEuEso/view?usp=drivesdk","https://drive.google.com/file/d/1FeojyFT1EPAl7xZcROHJ_uu7IviNG4Lc/view?usp=drivesdk","https://drive.google.com/file/d/1FQBiObk515JFq5FWyUEOxhvETdUOIksa/view?usp=drivesdk","https://drive.google.com/file/d/1FmH5aTnARtqZTryA97OiUlCfFYObcEYP/view?usp=drivesdk","https://drive.google.com/file/d/1FTqJH6IORfcX2xHWqaPnPKzCa6TuuiPV/view?usp=drivesdk","https://drive.google.com/file/d/1Fw5cPHvT-wnrSuO1ap6KEJl_2NGuGpE8/view?usp=drivesdk","https://drive.google.com/file/d/1Fw5cPHvT-wnrSuO1ap6KEJl_2NGuGpE8/view?usp=drivesdk","https://drive.google.com/file/d/1FX8S7agOjoIWnDH01l8cS2-TPIwpfOqI/view?usp=drivesdk","https://drive.google.com/file/d/1FYLpzM2b9KbrOuZoi5k1wKnXjGcBRlXX/view?usp=drivesdk",;
    const filePath = path.join(__dirname, "temp_video.mp4");

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
            body: "সবই সুন্দর আমি ছাড়া🖤𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
            attachment: fs.createReadStream(filePath)
          },
          event.threadID,
          event.messageID
        );
      });

      writer.on("error", () => {
        api.sendMessage("ভিডিও ডাউনলোড করতে সমস্যা হয়েছে।", event.threadID);
      });

    } catch (error) {
      api.sendMessage("ভিডিও পাঠাতে সমস্যা হয়েছে ❌", event.threadID);
      console.error(error);
    }
  }
};

module.exports.run = () => {};
