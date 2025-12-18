const express = require("express");

const app = express();
app.use(express.json());

// Memory me posts store honge
let posts = [];

// Telegram webhook endpoint
app.post("/webhook", (req, res) => {
  const msg = req.body.channel_post;
  if (!msg) return res.sendStatus(200);

  posts.push({
    text: msg.text || "(No text)",
    date: new Date().toISOString(),
    link: `https://t.me/${process.env.CHANNEL}/${msg.message_id}`
  });

  // max 50 posts
  if (posts.length > 50) posts.shift();

  res.sendStatus(200);
});

// Website ke liye API
app.get("/data", (req, res) => {
  res.json(posts.slice().reverse());
});

// Server start
app.listen(3000, () => {
  console.log("Server running");
});
