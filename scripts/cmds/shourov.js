module.exports = {
 config: {
	 name: "shourov",
	 version: "1.0",
	 author: "AceGun",
	 countDown: 5,
	 role: 0,
	 shortDescription: "no prefix",
	 longDescription: "no prefix",
	 category: "no prefix",
 },

 onStart: async function(){}, 
 onChat: async function({ event, message, getLang }) {
 if (event.body && event.body.toLowerCase() === "shourov"," Shourov","SHOUROV","সৌরভ") {
 return message.reply({
 body: " 「❥︎----ღ᭄_ᴬˢˢᴬᴸᴬᴹᴼᴸᴬᴵᴷᵁᴹ ..\n❥︎----ღ᭄_  ᴮᴿᴼᵀᴴᴱᴿ❞࿐.🌴.\n❥ ᴍᴏʜᴀᴍᴍᴀᴅ ʙᴀʏᴊɪᴅ\n\n𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥\n𝐊𝐈𝐍𝐆 𝐒𝐇𝐎𝐔𝐑𝐎𝐕」",
 attachment: await global.utils.getStreamFromURL("https://i.imgur.com/XlyIOMR.mp4")
 });
 }
 }
}
