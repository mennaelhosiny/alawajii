//header
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const sliderContainer = document.querySelector('.slider-container');

let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let autoMoveInterval;
const slideDuration = 3000; // Duration to show each slide (3 seconds)
const delayBetweenSlides = 3000; // Delay between slides (0.5 seconds)

// Function to show the slide
function showSlide(index) {
    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }
    updateSlider();
}

// Function to update the slider position
function updateSlider() {
    currentTranslate = currentSlideIndex * -slides[0].clientWidth;
    sliderContainer.style.transform = `translateX(${currentTranslate}px)`;
    updateDots();
}

// Function to update the dots
function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlideIndex);
    });
}

// Function to set the current slide
function currentSlide(index) {
    showSlide(index);
}

// Function to start the auto move with delay between slides
function startAutoMove() {
    autoMoveInterval = setInterval(() => {
        setTimeout(() => {
            showSlide(currentSlideIndex + 1);
        }, delayBetweenSlides);
    }, slideDuration + delayBetweenSlides);
}

// Function to stop the auto move
function stopAutoMove() {
    clearInterval(autoMoveInterval);
}

// Start auto move
startAutoMove();

// Function to start dragging
function startDrag(event) {
    isDragging = true;
    startPos = getPositionX(event);
    prevTranslate = currentTranslate;
    stopAutoMove(); // Stop auto move on user interaction
    animationID = requestAnimationFrame(animation);
}

// Function to end dragging
function endDrag() {
    isDragging = false;
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && currentSlideIndex < slides.length - 1) {
        currentSlideIndex += 1;
    }
    if (movedBy > 100 && currentSlideIndex > 0) {
        currentSlideIndex -= 1;
    }

    setPositionByIndex();
    updateDots(); // Ensure dots are updated after drag ends
    startAutoMove(); // Restart auto move after user interaction
}

// Function to handle dragging
function drag(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
        setSliderPosition();
    }
}

// Function to get the position X
function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

// Function to animate the slider
function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
}

// Function to set the slider position
function setSliderPosition() {
    sliderContainer.style.transform = `translateX(${currentTranslate}px)`;
}

// Function to set the position by index
function setPositionByIndex() {
    currentTranslate = currentSlideIndex * -slides[0].clientWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
}

// Add event listeners for touch and mouse events
sliderContainer.addEventListener('touchstart', startDrag);
sliderContainer.addEventListener('touchend', endDrag);
sliderContainer.addEventListener('touchmove', drag);

sliderContainer.addEventListener('mousedown', startDrag);
sliderContainer.addEventListener('mouseup', endDrag);
sliderContainer.addEventListener('mouseleave', endDrag);
sliderContainer.addEventListener('mousemove', drag);

window.addEventListener('resize', updateSlider);
updateSlider();


//homeslider
document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll(".image-section");
    const track = document.querySelector(".slide-track");
    let currentIndex = 0;
    const slideWidth = slides[0].clientWidth;
    const totalSlides = slides.length;

    function showSlide(index) {
        track.style.transform = `translateX(-${slideWidth * index}px)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    }

    setInterval(nextSlide, 3000);
    showSlide(currentIndex);
});














// second slider
document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector(".carousel");
    const arrowBtns = document.querySelectorAll(".wrapper i");
    const wrapper = document.querySelector(".wrapper");

    const firstCard = carousel.querySelector(".card");
    const firstCardWidth = firstCard.offsetWidth;

    let isDragging = false,
        startX,
        startScrollLeft,
        timeoutId;

    const dragStart = (e) => { 
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
        if (!isDragging) return;
    
        // Calculate the new scroll position
        const newScrollLeft = startScrollLeft - (e.pageX - startX);
    
        // Check if the new scroll position exceeds 
        // the carousel boundaries
        if (newScrollLeft <= 0 || newScrollLeft >= 
            carousel.scrollWidth - carousel.offsetWidth) {
            
            // If so, prevent further dragging
            isDragging = false;
            return;
        }
    
        // Otherwise, update the scroll position of the carousel
        carousel.scrollLeft = newScrollLeft;
    };

    const dragStop = () => {
        isDragging = false; 
        carousel.classList.remove("dragging");
    };

    const autoPlay = () => {
    
        // Return if window is smaller than 800
        if (window.innerWidth < 800) return; 
        
        // Calculate the total width of all cards
        const totalCardWidth = carousel.scrollWidth;
        
        // Calculate the maximum scroll position
        const maxScrollLeft = totalCardWidth - carousel.offsetWidth;
        
        // If the carousel is at the end, stop autoplay
        if (carousel.scrollLeft >= maxScrollLeft) return;
        
        // Autoplay the carousel after every 2500ms
        timeoutId = setTimeout(() => 
            carousel.scrollLeft += firstCardWidth, 2500);
    };

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    wrapper.addEventListener("mouseenter", () => 
        clearTimeout(timeoutId));
    wrapper.addEventListener("mouseleave", autoPlay);

    // Add event listeners for the arrow buttons to 
    // scroll the carousel left and right
    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id === "left" ? 
                -firstCardWidth : firstCardWidth;
        });
    });
});

//scrolling
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Smooth scroll to the target section
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  });

  
  //slide load

// detect error
const express = require('express');
const enforce = require('express-sslify');

const app = express();

// Redirect HTTP to HTTPS
app.use(enforce.HTTPS({ trustProtoHeader: true }));

// Your other middleware and routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
