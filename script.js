const apiKey = "hf_xxxxxxxxxxxxxxxxx";  // 🔑 Yahan apna HuggingFace API Key lagao
const endpoint = "https://api-inference.huggingface.co/models/facebook/musicgen-small";

document.getElementById('generateBtn').addEventListener('click', async () => {
    const prompt = document.getElementById('promptInput').value;
    if (!prompt) {
        alert("Please enter a prompt");
        return;
    }
    const status = document.getElementById('status');
    status.textContent = "Generating your AI Song... Please wait (~20 sec)";

    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: prompt })
    });

    if (!response.ok) {
        status.textContent = "❌ Error: " + response.statusText;
        return;
    }

    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = audioUrl;
    status.textContent = "✅ Your AI song is ready!";
});
