// Scroll effect for zoom and background reveal
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const modelsLinks = document.querySelector('.models-links');
    const backgroundMedia = document.querySelector('.background-media');

    // Zoom effect: scale increases with scroll (up to 5x)
    const scale = 1 + (scrollPosition / windowHeight) * 4;
    modelsLinks.style.transform = `scale(${Math.min(scale, 5)})`;

    // Fade in video as you scroll
    const opacity = Math.min(scrollPosition / (windowHeight * 0.5), 1);
    backgroundMedia.style.opacity = opacity;

    // Mask the video with "MODELS" text
    if (scrollPosition > 0) {
        backgroundMedia.style.webkitMaskImage = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><text x="50%" y="50%" font-family="Montserrat" font-weight="900" font-size="4rem" fill="white" text-anchor="middle" dominant-baseline="middle">MODELS</text></svg>')`;
        backgroundMedia.style.maskImage = backgroundMedia.style.webkitMaskImage;
    } else {
        backgroundMedia.style.webkitMaskImage = 'none';
        backgroundMedia.style.maskImage = 'none';
    }
});

// Audio control
const audio = document.getElementById('background-audio');

// Play audio only after user interaction (due to browser policies)
document.addEventListener('click', () => {
    if (audio.paused) {
        audio.play().catch(error => console.log('Audio play failed:', error));
    }
}, { once: true }); // Runs only once on first click
