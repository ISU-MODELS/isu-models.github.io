// Audio control with toggle button
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-audio');
    const video = document.querySelector('.video');
    const toggle = document.getElementById('audio-toggle');

    if (!audio || !video || !toggle) {
        console.error('Audio, video, or toggle element not found');
        return;
    }

    // Play audio by default
    audio.play().catch(error => console.error('Audio play failed:', error));
    video.play().catch(error => console.error('Video play failed:', error));

    // Sync button text with initial state (unmuted)
    toggle.textContent = 'Mute';

    toggle.addEventListener('click', () => {
        if (audio.muted) {
            audio.muted = false;
            video.muted = false;
            toggle.textContent = 'Mute';
        } else {
            audio.muted = true;
            video.muted = true;
            toggle.textContent = 'Unmute';
        }
    });
});

// Scroll effect (unchanged from above)
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const modelsLinks = document.querySelector('.models-links');
    const backgroundMedia = document.querySelector('.background-media');

    const scrollRatio = scrollPosition / windowHeight;
    const scale = 1 + Math.pow(scrollRatio, 2) * 49.5;
    modelsLinks.style.transform = `translate(-50%, -50%) scale(${Math.min(scale, 100)})`;

    const opacity = Math.min(scrollPosition / (windowHeight * 0.5), 1);
    backgroundMedia.style.opacity = opacity;
});
