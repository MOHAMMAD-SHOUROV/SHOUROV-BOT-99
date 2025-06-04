module.exports.config = {
  'name': "hot",
  'version': "1.0.1",
  'role': 0x0,
  'author': "MAHABUB RAHMAN",
  'description': "get 18+ video",
  'category': "media",
  'usages': "horny item video",
  'countDowns': 0x5,
  'dependencies': {
    'request': ''
  }
};
module.exports.onStart = async ({
  api: _0x411c4d,
  event: _0x59d708,
  args: _0xe43f4,
  client: _0x5ec49f,
  Users: _0x3d5264,
  Threads: _0x1cd1c7,
  __GLOBAL: _0x240662,
  Currencies: _0x294204
}) => {
  const _0x563830 = require("request");
  const _0x1a92bc = require("fs-extra");
  var _0x208bb6 = ["╔══❖•MR᭄﹅ MAHABUB﹅ メꪜ•❖══╗\n\n【• HOT-VIDEO•】\n\n╚══❖•𝐊𝐈𝐍𝐆 𝐒𝐇𝐎𝐔𝐑𝐎𝐕•❖══╝"];
  var _0x130995 = _0x208bb6[Math.floor(Math.random() * _0x208bb6.length)];
  var _0x5b799b = ["https://drive.google.com/uc?id=10r9JSdTGf1JKrdQG7vxXlH0GqM-hgWHi", "https://drive.google.com/uc?id=10hEt13pTM_0Og-DjlTE65FkzvJJk-cEp", "https://drive.google.com/uc?id=111exlB5om3SqlAqaaI-hGJ0iY6_enxlW", "https://drive.google.com/uc?id=10xNg0Cyo3jOY1XZOUOBvc6EUwZexY98k", "https://drive.google.com/uc?id=10eFm6s4v93laHKfGCAF2Gi83onHaNkfH", "https://drive.google.com/uc?id=10zESTM0ZPzaLjkBKqx1xTAYkjBujM11Z", "https://drive.google.com/uc?id=10yrc2V8wsarQoeetdbHhVpIh1UBZsRMf", "https://drive.google.com/uc?id=116RRysbUPupsaqcKaLDF8s4w_3dnyoLP", "https://drive.google.com/uc?id=10lsWH5OU92Ic58T5mhWcYlXaXriYqTgl", "https://drive.google.com/uc?id=1zNjTv0vEW8wQ8W9VWqA7kOlQby6HuGwW", "https://drive.google.com/uc?id=1zbh0feeFRrYu7o0HIP-Cqaj0uGktyl5C", "https://drive.google.com/uc?id=1zhwIPt-MkC39egPxq35CmYrSR7MwteDC", "https://drive.google.com/uc?id=1znDXaoXG-L2aA-ex4ubuI_hT-MKGhFhV", "https://drive.google.com/uc?id=1zXMpg1kra62dcfjw7KSR9OY_plECySwI", "https://drive.google.com/uc?id=1znQfHdxzmTl1y-bHZGgjf30loyuZ2P26", "https://drive.google.com/uc?id=1zVxKJPB8HbB3JIdTqPhl_oeFVN9Z8R6k", "https://drive.google.com/uc?id=1zPikuNIik8TzXvNPJFZ9xC1v_37auDcl", "https://drive.google.com/uc?id=1zNJMEqBOFceTbukwJCiukZgm_gFLAyQV", "https://drive.google.com/uc?id=1zhwIPt-MkC39egPxq35CmYrSR7MwteDC"];
  var _0x402631 = () => _0x411c4d.sendMessage({
    'body': "「 " + _0x130995 + " 」",
    'attachment': _0x1a92bc.createReadStream(__dirname + "/cache/N4ZR9L.mp4")
  }, _0x59d708.threadID, () => _0x1a92bc.unlinkSync(__dirname + "/cache/N4ZR9L.mp4"));
  return _0x563830(encodeURI(_0x5b799b[Math.floor(Math.random() * _0x5b799b.length)])).pipe(_0x1a92bc.createWriteStream(__dirname + "/cache/N4ZR9L.mp4")).on("close", () => _0x402631());
};
