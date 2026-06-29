const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
const { ChatHistory, Product } = require('../models');
const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Send message to chatbot
router.post('/message', async (req, res) => {
  try {
    const { message, userId, sessionId } = req.body;
    const session = sessionId || uuidv4();

    // Get chat history for context
    const chatHistory = await ChatHistory.findAll({
      where: { sessionId: session },
      order: [['createdAt', 'ASC']],
      limit: 10
    });

    // Build conversation context
    const messages = [
      {
        role: 'system',
        content: 'You are a helpful e-commerce chatbot assistant. Help users find products, track orders, and provide customer support.'
      },
      ...chatHistory.map(chat => ([
        { role: 'user', content: chat.userMessage },
        { role: 'assistant', content: chat.botResponse }
      ])).flat(),
      { role: 'user', content: message }
    ];

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages,
      max_tokens: 500
    });

    const botResponse = response.choices[0].message.content;

    // Save to chat history
    await ChatHistory.create({
      userId,
      sessionId: session,
      userMessage: message,
      botResponse
    });

    res.json({
      message: botResponse,
      sessionId: session
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get chat history
router.get('/history/:sessionId', async (req, res) => {
  try {
    const history = await ChatHistory.findAll({
      where: { sessionId: req.params.sessionId },
      order: [['createdAt', 'ASC']]
    });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
