// const express = require("express");
// const axios = require("axios");
// require("dotenv").config();

// const router = express.Router();

// router.post("/chat", async (req, res) => { // ✅ Yeh `/listings/chat` banayega
//     try {
//          console.log("request Body", req.body);
//         const userMessage = req.body.message;
//         if (!userMessage) {
//             return res.status(400).json({ reply: "Message is required!" });
//         }

//         const response = await axios.post(
//             "https://api.openai.com/v1/chat/completions",
//             {
//                 model: "gpt-3.5-turbo",
//                 messages: [{ role: "user", content: userMessage }],
//             },
//             {
//                 headers: {
//                     "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
//                     "Content-Type": "application/json",
//                 },
//             }
//         );

//         res.json({ reply: response.data.choices[0].message.content });
//     } catch (error) {
//         console.error("Error:", error.response?.data || error.message);
//         res.status(500).json({ reply: "Error processing request" });
//     }
// });

// module.exports = router;
