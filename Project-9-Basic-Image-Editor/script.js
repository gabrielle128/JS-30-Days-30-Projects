// Variables for slider inputs (used for applying filters to the image)
const filterA = document.getElementById("blur");       // Slider for blur effect
const filterB = document.getElementById("contrast");   // Slider for contrast effect
const filterC = document.getElementById("hue-rotate"); // Slider for hue-rotate effect
const filterD = document.getElementById("sepia");      // Slider for sepia effect

// Variables for radio buttons (used for flipping the image)
const noFlipBtn = document.getElementById("no-flip");   // Option for no flip
const flipXBtn = document.getElementById("flip-x");     // Option for horizontal flip (X-axis)
const flipYBtn = document.getElementById("flip-y");     // Option for vertical flip (Y-axis)

// Variables for image upload, display, and download
const uploadButton = document.getElementById("upload-button");  // File input to upload image
const image = document.getElementById("chosen-image");          // Image element to display uploaded image
const downloadButton = document.getElementById("download-button"); // Button to download the edited image

/**
 * Function to reset all filters and transformations to their default values.
 */
function resetFilter() {
    // Set default values for sliders
    filterA.value = "0";     // Reset blur to 0px
    filterB.value = "100";   // Reset contrast to 100%
    filterC.value = "0";     // Reset hue-rotate to 0deg
    filterD.value = "0";     // Reset sepia to 0%
    
    // Set the default radio button to 'no flip'
    noFlipBtn.checked = true;

    // Apply the default filter and transformation
    addFilter();
    flipImage();
}

/**
 * Event listener for uploading an image.
 * Converts the selected image into a base64 format and displays it.
 */
uploadButton.onchange = () => {
    resetFilter(); // Reset filters and transformations when a new image is uploaded

    // Display the image container
    document.querySelector(".image-container").style.display = "block";

    // Create a FileReader instance to read the uploaded file
    const reader = new FileReader();

    // Convert the uploaded image file into a base64-encoded string
    reader.readAsDataURL(uploadButton.files[0]);

    // When file reading is complete, set the result (base64 string) as the image source
    reader.onload = () => {
        image.setAttribute("src", reader.result);
    };
};

// Select all sliders within the 'filter' section
const sliders = document.querySelectorAll(".filter input[type='range']");

// Add event listeners to sliders to update filters and show slider values
sliders.forEach(slider => {
    slider.addEventListener("input", addFilter);      // Apply filter on slider input
    slider.addEventListener("input", showRangeValue); // Display the slider value
});

/**
 * Function to apply CSS filters to the uploaded image based on slider values.
 */
function addFilter() {
    // Combine filter values into a single CSS filter string
    image.style.filter = `blur(${filterA.value}px) 
                          contrast(${filterB.value}%) 
                          hue-rotate(${filterC.value}deg) 
                          sepia(${filterD.value}%)`;
}

/**
 * Function to display the current values of sliders next to each slider.
 */
function showRangeValue() {
    // Get all span elements with the class 'range-value'
    const rangeValues = document.querySelectorAll(".range-value");

    // Update each span with the corresponding slider value
    sliders.forEach((slider, index) => {
        rangeValues[index].textContent = `${slider.value}%`;
    });
}

// Select all radio buttons in the 'flip-option' section
const radioBtns = document.querySelectorAll(".flip-option input[type='radio']");

// Add event listeners to radio buttons to flip the image
radioBtns.forEach(radioBtn => {
    radioBtn.addEventListener("click", flipImage);
});

/**
 * Function to flip the image based on selected radio button (horizontal or vertical flip).
 */
function flipImage() {
    if (flipXBtn.checked) {
        // Flip image horizontally (X-axis)
        image.style.transform = "scaleX(-1)";
    } else if (flipYBtn.checked) {
        // Flip image vertically (Y-axis)
        image.style.transform = "scaleY(-1)";
    } else {
        // Reset image to original orientation
        image.style.transform = "scale(1, 1)";
    }
}

/**
 * Event listener for the "Download" button to save the edited image.
 */
downloadButton.onclick = () => {
    // Create a new canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext("2d"); // Get 2D drawing context for the canvas

    // Create a new image element and set its source to the displayed image
    const img = new Image();
    img.src = image.src;

    // Wait until the image is fully loaded
    img.onload = () => {
        // Set canvas dimensions to match the image dimensions
        canvas.width = img.width;
        canvas.height = img.height;

        // Apply CSS filters to the canvas context
        ctx.filter = image.style.filter;

        // Translate canvas origin to center for flipping transformations
        ctx.translate(canvas.width / 2, canvas.height / 2);

        // Apply flipping transformations based on selected radio button
        if (flipXBtn.checked) {
            ctx.scale(-1, 1); // Horizontal flip
        } else if (flipYBtn.checked) {
            ctx.scale(1, -1); // Vertical flip
        }

        // Draw the image on the canvas, accounting for transformations
        ctx.drawImage(img, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.download = 'edited-image.png';           // Set file name for download
        link.href = canvas.toDataURL();               // Convert canvas content to Data URL
        link.click();                                 // Simulate a click to start the download
    };
};

// Call resetFilter() on page load to set initial filter values
resetFilter();
