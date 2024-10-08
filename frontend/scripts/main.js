document.addEventListener('scroll', function () {
    const scrollLine = document.querySelector('.scroll-line');
    const blueSection = document.querySelector('.section');
    const sectionRect = blueSection.getBoundingClientRect(); // Получаем координаты секции

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight; // Максимальная прокрутка
    const scrollPosition = window.scrollY; // Текущая прокрутка

    // Вычисляем процент прокрутки страницы относительно .blue-section
    const sectionScrollTop = sectionRect.top + window.scrollY; // Верхняя граница секции относительно страницы
    const sectionHeight = sectionRect.height; // Высота секции
    const sectionScrollPosition = Math.max(0, scrollPosition - sectionScrollTop); // Прокрутка относительно секции
    const scrollPercent = sectionScrollPosition / (maxScroll - sectionScrollTop); // Процент прокрутки относительно секции

    // Движение линии от 0% до 100% и обратно
    const position = Math.abs(Math.sin(scrollPercent * Math.PI)) * 100; // Синус для плавного движения

    // Устанавливаем новое значение `transform` для линии

    scrollLine.style.transform = `translateX(${position}%)`;
});

// main.js
document.addEventListener("scroll", function() {
    const girlImg = document.querySelector('.girl__img');
    const introSection = document.querySelector('.section');

    // Get the distance of the intro section from the top of the page
    const introPosition = introSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Calculate the scroll progress, making sure it remains between 0 and 1
    let scrollProgress = 1 - (introPosition / windowHeight);
    scrollProgress = Math.min(Math.max(scrollProgress, 0), 1); // Clamp between 0 and 1

    // Move the image to the right based on scroll progress (e.g., up to 150px to the right)
    const moveDistance = scrollProgress * 150;
    girlImg.style.transform = `translateX(${moveDistance}px)`;

    // Adjust opacity based on scroll progress
    girlImg.style.opacity = 1 - scrollProgress;
});


let lastScrollTop = 0; // Store the last scroll position
const blueSection = document.querySelector('.blue-section'); // Reference point
const twoImages = document.querySelector('.two__images'); // Image container

// Function to check the position of the blue section relative to the viewport
function isBlueSectionInViewport() {
    const rect = blueSection.getBoundingClientRect();
    return (
        rect.top >= 0 && // Blue section is above the viewport top
        rect.bottom <= window.innerHeight // Blue section is below the viewport bottom
    );
}

// Function to handle scroll events
function handleScroll() {
    const scrollTop = window.scrollY; // Get the current scroll position

    if (isBlueSectionInViewport()) {
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            if (twoImages) {
                twoImages.classList.add('show'); // Show images when scrolling down
            }
        } else {
            // Scrolling up
            if (twoImages) {
                twoImages.classList.remove('show'); // Hide images when scrolling up
            }
        }
    } else {
        // When blue section is out of view, keep images in original position
        if (twoImages) {
            twoImages.classList.remove('show');
        }
    }

    lastScrollTop = scrollTop; // Update last scroll position
}

// Listen for scroll events
window.addEventListener('scroll', handleScroll);






