const express = require('express');
const { Chatbot, GeminiInput, SupportedChatModels } = require('intellinode');

const app = express();
const port = process.env.PORT || 3000;
const geminiApiKey = 'AIzaSyALNxfOb9q3xjocjoo8d6vL6MIM2-hKYMo';

app.get('/api', async (req, res) => {
    try {
        const userQuery = req.query.query;

        if (!userQuery) {
            return res.status(400).json({ error: 'Query parameter is required.' });
        }

        const input = new GeminiInput();
        input.addUserMessage(userQuery);

        const geminiBot = new Chatbot(geminiApiKey, SupportedChatModels.GEMINI);
        const response = await geminiBot.chat(input);

        const customResponse = {
            code: 200,
            status: true,
            question: userQuery,
            message: response[0], // Assign the first element of response directly
            author: 'AkhiroDEV'
        };

        res.json(customResponse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});