import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/fetch", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("Missing url");

  try {
    if (!/^https?:\/\//i.test(url)) {
      return res.status(400).send("Bad URL");
    }

    const r = await fetch(url);
    const text = await r.text();

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(text);
  } catch (e) {
    res.status(500).send("Fetch error: " + e.message);
  }
});

app.listen(PORT, () => console.log("Backend on", PORT));
