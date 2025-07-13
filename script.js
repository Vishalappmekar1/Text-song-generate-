if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}

const promptInput = document.getElementById('songPrompt');
const generateBtn = document.getElementById('generateBtn');
const loading = document.getElementById('loading');
const progressSpan = document.getElementById('progress');
const result = document.getElementById('result');
const songTitle = document.getElementById('songTitle');
const songLyrics = document.getElementById('songLyrics');
const downloadBtn = document.getElementById('downloadBtn');
const saveBtn = document.getElementById('saveBtn');
const mySongsList = document.getElementById('mySongsList');
const toast = document.getElementById('toast');
const songCover = document.getElementById('songCover');

document.getElementById('toggleMode').addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});

generateBtn.addEventListener('click', () => {
    let progress = 0;
    loading.style.display = 'block';
    result.style.display = 'none';
    const interval = setInterval(() => {
        progress += 10;
        progressSpan.textContent = progress + '%';
        if (progress >= 100) {
            clearInterval(interval);
            loading.style.display = 'none';
            result.style.display = 'block';
            songTitle.textContent = `AI Song for: "${promptInput.value}"`;
            songLyrics.textContent = 'La la la... these are your AI generated fake lyrics!';
            songCover.src = `https://via.placeholder.com/200x200.png?text=${encodeURIComponent(promptInput.value)}`;
        }
    }, 200);
});

downloadBtn.addEventListener('click', () => {
    const a = document.createElement('a');
    a.href = 'dummy_song.mp3';
    a.download = 'AI_Song.mp3';
    a.click();
    showToast('Song Downloaded!');
});

saveBtn.addEventListener('click', () => {
    const savedSongs = JSON.parse(localStorage.getItem('mySongs') || '[]');
    savedSongs.push(promptInput.value);
    localStorage.setItem('mySongs', JSON.stringify(savedSongs));
    updateMySongsList();
    showToast('Song Saved!');
});

function updateMySongsList() {
    const songs = JSON.parse(localStorage.getItem('mySongs') || '[]');
    mySongsList.innerHTML = '<h3>My Songs</h3>' + songs.map(song => `<p>🎵 ${song}</p>`).join('');
}
updateMySongsList();

function showToast(msg) {
    toast.innerText = msg;
    toast.style.display = 'block';
    setTimeout(() => toast.style.display = 'none', 2000);
}

const voiceBtn = document.getElementById('voiceBtn');
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;
if (recognition) {
    recognition.lang = 'en-IN';
    voiceBtn.addEventListener('click', () => recognition.start());
    recognition.onresult = (event) => {
        promptInput.value = event.results[0][0].transcript;
    };
} else {
    voiceBtn.disabled = true;
}
