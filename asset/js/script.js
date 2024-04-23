const initSlider = () => {
    const slideButtonn = document.querySelectorAll('.slide-button');
    const imageList = document.querySelector('.image-list');

    //? Slide images according to the button clicks
    slideButtonn.forEach(button =>{
        button.addEventListener('click', () => {
            const direction = button.id ==='prev-slide' ? -1 : 1;
            const scrollAmount = imageList.clientWidth * 2;
            imageList.scrollBy({left:scrollAmount,behavior:'smooth'})
        });   
    });
}


window.addEventListener('load', initSlider);