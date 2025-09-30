const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;
        
        if (!userMessage || userMessage.trim() === "") {
            return res.status(400).json({ reply: "Please enter a message!" });
        }

        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful travel assistant for Wanderlust, a vacation rental platform. Help users find accommodations, answer questions about listings, and provide travel advice. Keep responses concise and friendly."
                    },
                    {
                        role: "user",
                        content: userMessage
                    }
                ],
                max_tokens: 150,
                temperature: 0.7
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        console.error("Chatbot Error:", error.response?.data || error.message);
        res.status(500).json({ 
            reply: "Sorry, I'm having trouble responding right now. Please try again later." 
        });
    }
});

module.exports = router;