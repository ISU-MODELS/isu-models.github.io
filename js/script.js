// Scroll effect for zoom and background reveal
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const modelsLinks = document.querySelector('.models-links');
    const backgroundMedia = document.querySelector('.background-media');

    // Zoom effect: scale increases with scroll (up to 200x)
    const scale = 1 + (scrollPosition / windowHeight) * 99;
    modelsLinks.style.transform = `translate(-50%, -50%) scale(${Math.min(scale, 100)})`;

    // Fade in video as you scroll
    const opacity = Math.min(scrollPosition / (windowHeight * 0.5), 1);
    backgroundMedia.style.opacity = opacity;

    // Mask scales with text, centered on "D"
    if (scrollPosition > 0) {
        const maskFontSize = 8 * Math.min(scale, 100);
        const maskXOffset = 50 - (scrollPosition / windowHeight) * 25;
        backgroundMedia.style.webkitMaskImage = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><text x="${maskXOffset}%" y="50%" font-family="Montserrat" font-weight="900" font-size="${maskFontSize}rem" fill="white" text-anchor="middle" dominant-baseline="middle">MODELS</text></svg>')`;
        backgroundMedia.style.maskImage = backgroundMedia.style.webkitMaskImage;
    } else {
        backgroundMedia.style.webkitMaskImage = 'none';
        backgroundMedia.style.maskImage = 'none';
    }
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

    // Test audio source
    console.log('Audio source:', audio.src);
});
