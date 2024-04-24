const initSlider = (sliderId) => {
    const slideButtons = document.querySelectorAll(`#${sliderId} .slide-button`);
    const imageList = document.querySelector(`#${sliderId} .image-list`);
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    const sliderScrollbar = document.querySelector(`#${sliderId} .slider-scrollbar`);
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
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));

            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
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
            const direction = button.id === `${sliderId}-prev-slide` ? -1 : 1;
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
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    imageList.addEventListener('scroll', () => {
        handleSlideButtons();
        updateScrollThumbPosition();
    });
};

window.addEventListener('load', () => {
    initSlider('destaques');
    initSlider('produtos');
});



//Configuracao do menu======================================
function menuShow(){  
    const menuMobile = document.querySelector('.mobile-menu');
    if(menuMobile.classList.contains('open')){
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src ="asset/img/menu_white_36dp.svg"; 
    }else {
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "asset/img/close_white_36dp.svg";
    }

}


//ANIMAÇAO DA PAGINA =========================================

const elements = document.querySelectorAll('[data-anima]');
const anamacaoClass = 'animacao';

//faz a animacao
function animaScroll(){
    const topPageWin= window.pageYOffset+((window.innerHeight*3)/4);
    elements.forEach(function(elemento){
        if(topPageWin > elemento.offsetTop){
            elemento.classList.add(anamacaoClass);
        }else{
            elemento.classList.remove(anamacaoClass);
        }
    });
}

if(elements.length) {
    window.addEventListener('scroll', function(){
        animaScroll();
    })
}

// MEDIA MOBILE ==============================================>
function responsive(){
    const moveImg = document.querySelector('.flexivel');    
}

// Animacao do Menu =========================================>
window.addEventListener('scroll', function(){
    const header = document.querySelector('#header');
    header.classList.toggle('rolagem', window.scrollY > 200);
});

//Calculadora de estilos de decoracao ========================>
document.getElementById('style-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const colorScheme = document.getElementById('color-scheme').value;
    const furnitureStyle = document.getElementById('furniture').value;
    const decorElements = document.getElementById('decor-elements').value;

    let result = '';

    if (colorScheme === 'neutro' && furnitureStyle === 'moderno' && decorElements === 'minimalista') {
        result = 'Seu estilo de decoração ideal é Minimalista Moderno.';
    } else if (colorScheme === 'colorido' && furnitureStyle === 'vintage' && decorElements === 'boho') {
        result = 'Seu estilo de decoração ideal é Boho Vintage.';
    } else if (colorScheme === 'tons-pastel' && furnitureStyle === 'rústico' && decorElements === 'industrial') {
        result = 'Seu estilo de decoração ideal é Industrial Rústico.';
    } else if (colorScheme === 'monocromático' && furnitureStyle === 'contemporâneo' && decorElements === 'clássico') {
        result = 'Seu estilo de decoração ideal é Clássico Contemporâneo.';
    } else {
        result = 'Com base nas suas preferências, não conseguimos determinar um estilo de decoração específico.';
    }

    document.getElementById('result').textContent = result;
});

