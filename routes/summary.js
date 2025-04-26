const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

router.post('/generate-summary', async (req, res) => {
  try {
    const {
      experience,
      currentRole,
      currentCompany,
      technicalSkills,
      softSkills,
      education,
      projects
    } = req.body;

    // Prepare the prompt for OpenAI
    let prompt = `Generate a professional summary for a resume with the following details:\n\n`;

    if (currentRole && currentCompany) {
      prompt += `Current Position: ${currentRole} at ${currentCompany}\n`;
    }

    if (experience && experience.length > 0) {
      prompt += `\nPrevious Experience:\n`;
      experience.forEach(exp => {
        prompt += `- ${exp.role} at ${exp.company}: ${exp.responsibilities}\n`;
      });
    }

    if (technicalSkills && technicalSkills.length > 0) {
      prompt += `\nTechnical Skills: ${technicalSkills.join(', ')}\n`;
    }

    if (softSkills && softSkills.length > 0) {
      prompt += `\nSoft Skills: ${softSkills.join(', ')}\n`;
    }

    if (education && education.length > 0) {
      prompt += `\nEducation:\n`;
      education.forEach(edu => {
        prompt += `- ${edu.degree} from ${edu.school}\n`;
      });
    }

    if (projects && projects.length > 0) {
      prompt += `\nProjects:\n`;
      projects.forEach(proj => {
        prompt += `- ${proj.title} using ${proj.technologies}\n`;
      });
    }

    prompt += `\nGenerate a concise, professional summary in first person that highlights key achievements, skills, and experience. Keep it under 4 sentences.`;

    // Make request to OpenAI API
    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a professional resume writer who creates compelling professional summaries."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 200
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const summary = openaiResponse.data.choices[0].message.content.trim();
    res.json({ summary });
  } catch (error) {
    console.error('Error generating summary:', error);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
});

module.exports = router; 