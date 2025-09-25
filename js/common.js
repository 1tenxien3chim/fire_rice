const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu-main");
toggle.addEventListener("click", () => {
    menu.classList.toggle("active");
    toggle.classList.toggle("active");
});

// slider main
(function() {
    const slider = document.getElementById('slider');
    const slides = Array.from(document.querySelectorAll('.slide'));
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const dotsContainer = document.getElementById('dots');

    let current = 0;
    const total = slides.length;
    const autoplayDelay = 4000; 
    let autoplayTimer = null;
    let isPaused = false;

    // Build dots
    for (let i = 0; i < total; i++) {
        const d = document.createElement('div');
        d.className = 'dot' + (i === 0 ? ' active' : '');
        d.dataset.index = i;
        dotsContainer.appendChild(d);
    }
    const dots = Array.from(document.querySelectorAll('.dot'));

    function goTo(index) {
        if (index === current) return;
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (index + total) % total;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
    }

    function next() {
        goTo(current + 1);
    }

    function prev() {
        goTo(current - 1);
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        next();
        resetAutoplay();
    });
    prevBtn.addEventListener('click', () => {
        prev();
        resetAutoplay();
    });

    dots.forEach(d => d.addEventListener('click', e => {
        goTo(Number(e.currentTarget.dataset.index));
        resetAutoplay();
    }));

    // Autoplay
    function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(() => {
            if (!isPaused) next();
        }, autoplayDelay);
    }

    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    }

    function resetAutoplay() {
        startAutoplay();
    }

    // Pause on hover/focus
    slider.addEventListener('mouseenter', () => {
        isPaused = true;
    });
    slider.addEventListener('mouseleave', () => {
        isPaused = false;
    });

    // Keyboard support
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prev();
            resetAutoplay();
        }
        if (e.key === 'ArrowRight') {
            next();
            resetAutoplay();
        }
    });

    // Touch (swipe) support
    let touchStartX = 0;
    let touchEndX = 0;
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].clientX;
        isPaused = true;
    }, {
        passive: true
    });
    slider.addEventListener('touchmove', (e) => {
        touchEndX = e.changedTouches[0].clientX;
    }, {
        passive: true
    });
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 40) {
            if (diff < 0) next();
            else prev();
            resetAutoplay();
        }
        isPaused = false;
    });
    startAutoplay();
    window.addEventListener('resize', () => {

    });

})();
