const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
}));

app.use(express.json());

app.post("/generate", async (req, res) => {
  const { text } = req.body;

  try {
    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "phi3",
        prompt: `Generate structured notes from:\n\n${text}`,
        stream: false
      }
    );

    res.json({ output: response.data.response });
  } catch (error) {
    console.log("Backend error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("Backend running on port 5000"));
