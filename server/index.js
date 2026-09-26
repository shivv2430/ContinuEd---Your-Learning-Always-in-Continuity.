/**
 * ContinuEd Backend Service (Node.js & Express)
 * Handles secure communication with Nebius AI API and server-side operations.
 * Protects NEBIUS_API_KEY from exposure to the frontend client.
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const NEBIUS_API_KEY = process.env.NEBIUS_API_KEY;
const NEBIUS_BASE_URL = 'https://api.studio.nebius.ai/v1';

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'ContinuEd AI Continuity Service',
    nebiusConfigured: Boolean(NEBIUS_API_KEY),
    timestamp: new Date().toISOString()
  });
});

/**
 * Generate AI Catch-Up Plan via Nebius Studio
 * Calls chat completions with structured JSON format
 */
app.post('/api/ai/catchup-plan', async (req, res) => {
  try {
    const { subject, topic, classDescription, importantPoints, prerequisites } = req.body;

    if (!NEBIUS_API_KEY) {
      return res.status(503).json({
        error: 'Nebius API key is not configured on the server. Falling back to local AI generation logic.'
      });
    }

    const systemPrompt = `You are ContinuEd's pedagogical AI mentor. 
A student missed the class "${topic}" in "${subject}".
Create an empathetic, structured, and highly actionable Catch-Up Plan with:
1. A concise, crystal-clear 2-3 paragraph summary ("Simple Explanation")
2. Key core concepts breakdown
3. Prerequisites (what the student needs to review first)
4. A 4-step progressive catch-up schedule with time estimates
5. Practice conceptual questions.`;

    const userPrompt = `
Topic: ${topic}
Subject: ${subject}
Lecture Overview: ${classDescription || 'Standard university lecture'}
Key Instructor Notes: ${importantPoints?.join(', ') || 'Core syllabus concepts'}
Prior foundations: ${prerequisites?.join(', ') || 'Foundational topic'}
Please output structured JSON format.`;

    const response = await fetch(`${NEBIUS_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${NEBIUS_API_KEY}`
      },
      body: JSON.stringify({
        model: 'meta-llama/Meta-Llama-3.1-70B-Instruct',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Nebius API error: ${response.status} - ${errText}`);
    }

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);
    return res.json({ success: true, plan: result });
  } catch (error) {
    console.error('Catch-up plan generation failed:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Generate 5 targeted quiz questions for Missed Class content
 */
app.post('/api/ai/quiz', async (req, res) => {
  try {
    const { topic, subject, keyPoints } = req.body;

    if (!NEBIUS_API_KEY) {
      return res.status(503).json({
        error: 'Nebius API key not set on server. Use local fallback.'
      });
    }

    const response = await fetch(`${NEBIUS_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${NEBIUS_API_KEY}`
      },
      body: JSON.stringify({
        model: 'meta-llama/Meta-Llama-3.1-70B-Instruct',
        messages: [
          {
            role: 'system',
            content: 'Generate 5 rigorous multiple-choice questions assessing understanding of the missed lecture. Return JSON array with fields: id, question, options (4 strings), correctIndex (0-3), and explanation.'
          },
          {
            role: 'user',
            content: `Topic: ${topic}, Subject: ${subject}, Notes: ${keyPoints?.join('; ')}`
          }
        ],
        temperature: 0.2,
        response_format: { type: 'json_object' }
      })
    });

    const data = await response.json();
    return res.json({ success: true, questions: JSON.parse(data.choices[0].message.content) });
  } catch (error) {
    console.error('AI Quiz generation error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`ContinuEd Server listening on port ${PORT}`);
});
