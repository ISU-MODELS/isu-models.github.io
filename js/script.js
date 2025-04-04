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

// Audio control with toggle button
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-audio');
    const toggle = document.getElementById('audio-toggle');

    if (!audio) {
        console.error('Audio element not found');
        return;
    }
    if (!toggle) {
        console.error('Toggle button not found');
        return;
    }

    console.log('Audio and toggle found, setting up listener');
    console.log('Audio source:', audio.currentSrc || 'Not loaded yet');

    toggle.addEventListener('click', () => {
        console.log('Toggle clicked');
        if (audio.paused) {
            console.log('Attempting to play audio');
            audio.play()
                .then(() => {
                    toggle.textContent = 'Pause Audio';
                    console.log('Audio started playing');
                })
                .catch(error => {
                    console.error('Audio play failed:', error.message);
                });
        } else {
            console.log('Pausing audio');
            audio.pause();
            toggle.textContent = 'Play Audio';
            console.log('Audio paused');
        }
    });
});
