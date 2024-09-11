const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/api", async (req, res) => {
  try {
    const { q, source, target } = req.body;

    // Make sure all required fields are provided
    if (!q || !source || !target) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Send GET request to MyMemory API
    const response = await axios.get(
      "https://api.mymemory.translated.net/get",
      {
        params: {
          q,
          langpair: `${source}|${target}`,
        },
      }
    );

    // Extract translated text from response
    const translatedText = response.data.responseData.translatedText;

    if (translatedText) {
      res.status(200).send({ translatedText });
    } else {
      res.status(500).send({ error: "Translation failed" });
    }
  } catch (e) {
    console.error("error ->", e);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
