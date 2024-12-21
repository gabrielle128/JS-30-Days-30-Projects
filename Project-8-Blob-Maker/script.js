// Get the output field where the generated CSS code will be displayed
let outputCode = document.getElementById("css-code");

// Select all range sliders (input[type='range']) and add an event listener for the "input" event
let sliders = document.querySelectorAll("input[type='range']");
sliders.forEach(function(slider) {
    slider.addEventListener("input", createBlob); // Call createBlob whenever the slider changes
});

// Select all number inputs (input[type='number']) and add an event listener for the "change" event
let inputs = document.querySelectorAll("input[type='number']");
inputs.forEach(function(inp) {
    inp.addEventListener("change", createBlob); // Call createBlob whenever the number input changes
});

/**
 * Function to dynamically create a "blob" shape by setting its border-radius,
 * height, and width based on slider and number input values.
 */
function createBlob() {
    // Retrieve values from the range sliders
    let radiusOne = sliders[0].value;  // Top-left horizontal radius
    let radiusTwo = sliders[1].value;  // Top-right vertical radius
    let radiusThree = sliders[2].value; // Bottom-right horizontal radius
    let radiusFour = sliders[3].value; // Bottom-left vertical radius

    // Retrieve values from the number inputs for blob height and width
    let blobHeight = inputs[0].value;  // Blob height
    let blobWidth = inputs[1].value;   // Blob width

    /**
     * The CSS border-radius shorthand can take two sets of radii:
     * - First set: Horizontal radii (Top-left, Top-right, Bottom-right, Bottom-left)
     * - Second set: Vertical radii (Top-left, Top-right, Bottom-right, Bottom-left)
     *
     * Syntax: border-radius: H1 H2 H3 H4 / V1 V2 V3 V4;
     *
     * Here, we calculate the percentages dynamically for a smooth blob effect.
     */
    let borderRadius = `${radiusOne}% ${100 - radiusOne}% ${100 - radiusThree}% ${radiusThree}% / ${radiusFour}% ${radiusTwo}% ${100 - radiusTwo}% ${100 - radiusFour}%`;

    // Generate the full CSS style for the blob
    let blobStyle = `border-radius: ${borderRadius}; height: ${blobHeight}px; width: ${blobWidth}px;`;

    // Apply the generated styles to the ".blob" element
    document.querySelector(".blob").style.cssText = blobStyle;

    // Display the generated CSS code in the output field
    outputCode.value = blobStyle;
}

/**
 * Functionality to copy the generated CSS code to the clipboard
 * when the user clicks the "Copy" button.
 */
document.getElementById("copy").addEventListener("click", function() {
    // Check if Clipboard API is supported in the browser
    if (navigator.clipboard && navigator.clipboard.writeText) {
        // Use Clipboard API to copy text
        navigator.clipboard.writeText(outputCode.value)
            .then(() => {
                alert('CSS Code Copied!'); // Success feedback
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
                alert('Failed to copy text. Please try again!');
            });
    } else {
        // Fallback for older browsers that don't support Clipboard API
        let tempTextarea = document.createElement("textarea"); // Create a temporary textarea element
        tempTextarea.value = outputCode.value; // Set its value to the CSS code
        document.body.appendChild(tempTextarea); // Append it to the document body
        tempTextarea.select(); // Select the text in the textarea

        try {
            // Attempt to copy using document.execCommand
            document.execCommand("copy");
            alert('CSS Code Copied!'); // Success feedback
        } catch (err) {
            console.error('Fallback: Unable to copy text', err);
            alert('Failed to copy text.');
        }

        // Remove the temporary textarea element from the DOM
        document.body.removeChild(tempTextarea);
    }
});

// Call createBlob() on page load to initialize the blob with default values
createBlob();