const initSlider = () => {
    const slideButtons = document.querySelectorAll('.slide-button');
    const imageList = document.querySelector('.image-list');
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    const sliderScrollbar = document.querySelector('.slider-scrollbar');
    const scrollbarThumb = sliderScrollbar.querySelector('.scrollbar-thumb');

    // Handle scrollbar thumb drag 
    scrollbarThumb.addEventListener('mousedown', (event) => {
        const startX = event.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;

        // Update thumb position on move mouse
        const handleThumbMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
            // Limit thumb position
            const boundedPosition = Math.max(0,Math.min(maxThumbPosition, newThumbPosition));

            const  scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        // Remove event listeners on mouse up
        const handlerMouseUp = () => {
            document.removeEventListener('mousemove', handleThumbMove);
            document.removeEventListener('mouseup', handlerMouseUp);
        }

        document.addEventListener('mousemove', handleThumbMove);
        document.addEventListener('mouseup', handlerMouseUp);
    });

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

    // Atualiza a posição do thumb do scrollbar
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition  / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    imageList.addEventListener('scroll', () => {
        handleSlideButtons();
        updateScrollThumbPosition();

    });
};

window.addEventListener('load', initSlider);
