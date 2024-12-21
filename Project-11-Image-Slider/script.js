// Initialize the current slide index to 0
let currentSlide = 0;

// Total number of slides (assumes there are 4 slides/images)
const totalSlides = 4;

// Get references to the navigation dots and slider images
const dots = document.querySelectorAll(".dot-container button");
const images = document.querySelectorAll(".image-container img");

/**
 * Updates the currently displayed slide and navigation indicator.
 * @param {number} newIndex - The index of the new slide to display.
 */
function updateSlide(newIndex) {
    // Remove the "active" class from the current slide (hides the current image)
    images[currentSlide].classList.remove("active");

    // Update the current slide index
    currentSlide = newIndex;

    // Add the "active" class to the new slide (displays the selected image)
    images[currentSlide].classList.add("active");

    // Update the navigation indicator (dots)
    updateIndicator(currentSlide);
}

/**
 * Updates the visual indicator (dot) for the current slide.
 * @param {number} index - The index of the active slide.
 */
function updateIndicator(index) {
    // Reset the background color of all dots
    dots.forEach(dot => {
        dot.style.backgroundColor = "transparent"; // Reset to default state
    });

    // Highlight the dot corresponding to the active slide
    dots[index].style.backgroundColor = "#6e473b"; // Active state color
}

/**
 * Advances to the next slide. Loops back to the first slide after the last slide.
 */
function next() {
    // Calculate the next slide index, wrapping back to 0 after the last slide
    const newIndex = (currentSlide + 1) % totalSlides;
    updateSlide(newIndex); // Update the slide display
}

/**
 * Moves to the previous slide. Loops to the last slide when on the first slide.
 */
function prev() {
    // Calculate the previous slide index, wrapping to the last slide from the first
    const newIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlide(newIndex); // Update the slide display
}

// Initialize the slider to start at the first slide and dot
updateSlide(0);
