// Scroll effect for zoom and background reveal
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const modelsLinks = document.querySelector('.models-links');
    const backgroundMedia = document.querySelector('.background-media');

    // Zoom effect: scale increases with scroll (up to 200x)
    const scale = 1 + (scrollPosition / windowHeight) * 199; // Reach 200 at bottom
    modelsLinks.style.transform = `translate(-50%, -50%) scale(${Math.min(scale, 200)})`;

    // Fade in video as you scroll
    const opacity = Math.min(scrollPosition / (windowHeight * 0.5), 1);
    backgroundMedia.style.opacity = opacity;

    // Mask scales with text, centered on "D"
    if (scrollPosition > 0) {
        const maskFontSize = 4 * Math.min(scale, 200);
        const maskXOffset = 50 - (scrollPosition / windowHeight) * 25; // Shift to "D"
        backgroundMedia.style.webkitMaskImage = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><text x="${maskXOffset}%" y="50%" font-family="Montserrat" font-weight="900" font-size="${maskFontSize}rem" fill="white" text-anchor="middle" dominant-baseline="middle">MODELS</text></svg>')`;
        backgroundMedia.style.maskImage = backgroundMedia.style.webkitMaskImage;
    } else {
        backgroundMedia.style.webkitMaskImage = 'none';
        backgroundMedia.style.maskImage = 'none';
    }
});

// Audio control with toggle button
const audio = document.getElementById('background-audio');
const toggle = document.getElementById('audio-toggle');

if (audio && toggle) {
    toggle.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().then(() => {
                toggle.textContent = 'Pause Audio';
            }).catch(error => console.log('Audio play failed:', error));
        } else {
            audio.pause();
            toggle.textContent = 'Play Audio';
        }
    });
} else {
    console.log('Audio or toggle element not found');
}
