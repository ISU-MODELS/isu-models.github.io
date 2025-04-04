const audio = document.getElementById('background-audio');
const button = document.getElementById('unmute-button');

button.addEventListener('click', function() {
    audio.muted = !audio.muted;
    button.textContent = audio.muted ? 'Unmute' : 'Mute';
});
