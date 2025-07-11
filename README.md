
# Text‑to‑Song Generator (Voicery API Version)

🎤 Convert lyrics to song-like speech using Voicery's expressive TTS.

## 🛠 Features
- Paste lyrics
- Choose voice, style, beat
- Get high-quality MP3 response via Voicery API

## 🚀 Getting Started

```bash
unzip text-to-song-ai.zip
cd text-to-song
cp .env.example .env   # replace with your Voicery API Key
npm install
node server.js
```

Then open http://localhost:5000 in your browser.

## 🔑 Voicery API Key
1. Create account at https://www.voicery.com
2. Get API key and paste in `.env`

```
VOICERY_API_KEY=your_key_here
```

## 🧪 Test Voices
Try values like: `matt`, `jess`, `ryan`, etc. (see voicery.com docs)

## 📁 Structure
- `frontend/` – user interface
- `server.js` – backend API caller
- `.env.example` – template for API key
