
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'frontend')));

app.post('/generate', async (req, res) => {
  const { lyrics, voice, style, beat } = req.body;

  if (!lyrics || !voice) {
    return res.status(400).json({ error: 'Lyrics and voice are required' });
  }

  try {
    const response = await axios.post(
      'https://api.voicery.com/v1/generate',
      {
        text: lyrics,
        voice: voice,
        style: style || 'default',
        format: 'mp3'
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.VOICERY_API_KEY}`
        },
        responseType: 'arraybuffer'
      }
    );

    const audioBase64 = Buffer.from(response.data, 'binary').toString('base64');
    const audioDataUrl = `data:audio/mp3;base64,${audioBase64}`;
    return res.json({ audio_url: audioDataUrl });

  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
    return res.status(500).json({ error: 'Voicery generation failed' });
  }
});

app.listen(PORT, () => console.log('Voicery server running on port', PORT));
