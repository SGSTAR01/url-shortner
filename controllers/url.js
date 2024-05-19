import { nanoid } from "nanoid";
import URL from "../models/url.js";

export async function handleGenerateShortUrl(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "URL is required" });
  }
  const shortUrl = nanoid(8);
  await URL.create({ shortURL: shortUrl, redirectURL: body.url, history: [] });
  return res.render("home", { shortUrl });
}

export async function handleRedirect(req, res) {
  const received = req.params.shortURL;
  try {
    const url = await URL.findOneAndUpdate(
      { shortURL: received },
      { $push: { history: new Date() } }
    );
    if (url === null) {
      return res.status(404).json({ error: "URL not found" });
    }
    res.redirect(url.redirectURL);
  } catch (err) {
    console.log(err);
  }
}

export async function handleGetAnalytics(req, res) {
  const received = req.params.shortURL;
  try {
    const url = await URL.findOne({ shortURL: received });
    if (url === null) {
      return res.status(404).json({ error: "URL not found" });
    }
    res.json({ count: url.history.length, history: url.history });
  } catch (err) {
    console.log(err);
  }
}

export async function handleDelete(req, res) {
  const received = req.params.shortURL;
  try {
    const url = await URL.findOneAndDelete({ shortURL: received });
    if (url === null) {
      return res.status(404).json({ error: "URL not found" });
    }
    res.json({ message: "URL deleted" });
  }
  catch (err) {
    console.log(err);
  }
}
