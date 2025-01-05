const express = require("express");
const axios = require("axios");
const { JSDOM } = require("jsdom");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.post("/process-url", async (req, res) => {
    const { url } = req.body;

    try {
        // Step 1: Scrape the webpage
        const { data: html } = await axios.get(url);
        const dom = new JSDOM(html);

        // Extract keywords or title
        const title = dom.window.document.querySelector("title").textContent;

        // Step 2: Query YouTube API
        const YOUTUBE_API_KEY = "YOUR_YOUTUBE_API_KEY"; // Replace with your API key
        const youtubeResponse = await axios.get(
            "https://www.googleapis.com/youtube/v3/search",
            {
                params: {
                    part: "snippet",
                    q: title, // Search using the page title
                    type: "video",
                    maxResults: 5,
                    key: YOUTUBE_API_KEY,
                },
            }
        );

        // Step 3: Query Udemy API or other free sources
        // Replace with actual Udemy API or scraping logic

        // Send results back to frontend
        res.json({
            youtube: youtubeResponse.data.items,
            // Add additional results here as needed
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to process URL." });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
