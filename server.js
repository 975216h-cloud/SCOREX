
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "SCOREX",
    status: "online",
    message: "SCOREX Server is running!"
  });
});

app.get("/api/matches", async (req, res) => {
  const token = process.env.FOOTBALL_API_KEY;

  if (!token) {
    return res.status(503).json({
      matches: [],
      message: "API key is not configured yet"
    });
  }

  try {
    const response = await fetch(
      "https://api.football-data.org/v4/matches",
      {
        headers: {
          "X-Auth-Token": token
        }
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({
        matches: [],
        message: "Football API request failed"
      });
    }

    const data = await response.json();

    res.json({
      matches: data.matches || []
    });

  } catch (error) {
    res.status(500).json({
      matches: [],
      message: "Server error"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("SCOREX is running on port " + PORT);
});
