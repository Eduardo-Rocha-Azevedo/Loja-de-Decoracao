const initSlider = () => {
    const slideButtons = document.querySelectorAll('.slide-button');
    const imageList = document.querySelector('.image-list');
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    const sliderScrollbar = document.querySelector('.slider-scrollbar');
    // Slide images according to the button clicks
    slideButtons.forEach(button => {
        button.addEventListener('click', () => {
            const direction = button.id === 'prev-slide' ? -1 : 1;
            const scrollAmount = direction * (imageList.clientWidth / 2); // Ajusta o valor do deslocamento conforme a direção
            imageList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    });

    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? 'none' : 'block';
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? 'none' : 'block';
    };

    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition  / maxScrollLeft) * ();
    }

    imageList.addEventListener('scroll', () => {
        handleSlideButtons();
        updateScrollThumbPosition();

    });
};

window.addEventListener('load', initSlider);
