
const slidesContainer = document.querySelector('.slides-container');
const imageSlides = document.querySelectorAll('.slides-container img');
const dots = document.querySelectorAll('.dot');
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');

let slideIndex = 0;
let slideWidth = 420;
let screenWidth = window.screen.width;
let start;
let end;
let intervalId;
// slider function
function updateSlider() {
    imageSlides.forEach(slide => slide.style.transform = `translateX(-${slideIndex * (slideWidth < screenWidth ? slideWidth : screenWidth)}px)`);

    dots.forEach(dot => dot.classList.remove('active'));
    dots[slideIndex].classList.add('active');
}

// moving slides with the arrow buttons
function previousSlide() {
    slideIndex <= 0 ? slideIndex = imageSlides.length - 1 : slideIndex--;

    updateSlider();
}

function nextSlide() {
    slideIndex >= imageSlides.length - 1 ? slideIndex = 0 : slideIndex++;

    updateSlider();
}

arrowLeft.addEventListener('click', previousSlide);
arrowRight.addEventListener('click', nextSlide);

function startInterval() {
    intervalId = setInterval(nextSlide, 1000);
}

function stopInterval() {
    clearInterval(intervalId);
}

window.addEventListener('load', startInterval);

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        previousSlide();
    }
});

// moving slides with dots indicators
function goToSlide(index) {
    slideIndex = index;
    updateSlider();
}

dots.forEach((dot, index) => dot.addEventListener('click', () => goToSlide(index)));


// handling screen resize
function adjustScreen() {
    screenWidth = window.screen.width;
    updateSlider();
}

window.addEventListener('resize', adjustScreen);

// moving slides with finger swipe
slidesContainer.addEventListener('touchstart', (e) => {
    start = e.touches[0].clientX;
});

slidesContainer.addEventListener('touchend', (e) => {
    end = e.changedTouches[0].clientX;
    const diff = end - start;
    if (diff > 50) {
        previousSlide();
    } else if (diff < -50) {
        nextSlide();
    }
});
slidesContainer.addEventListener('mouseenter', stopInterval);
slidesContainer.addEventListener('mouseleave', startInterval);

