// Select the box element where the shadow will be applied
const elem = document.getElementById("element");

// Select the textarea element where the generated box-shadow CSS code will appear
const code = document.getElementById("code");

// Select all input elements within the ".sliders" container
const sliders = document.querySelectorAll(".sliders input");

// Add an 'input' event listener to all sliders
// Whenever a slider value changes, the `generateShadow` function is called
sliders.forEach((slider) => slider.addEventListener("input", generateShadow));

/**
 * Main function to generate and apply the box-shadow.
 * This function:
 * 1. Retrieves all the input values (shadow parameters)
 * 2. Generates the box-shadow CSS string
 * 3. Applies the shadow to the box element
 * 4. Updates the textarea with the generated CSS
 */
function generateShadow() {
    // Retrieve all shadow parameters
    const shadowParams = getShadowParams();

    // Create the box-shadow CSS string using the retrieved parameters
    const boxShadow = createBoxShadow(...shadowParams);

    // Apply the generated box-shadow to the target element
    applyShadow(elem, boxShadow);

    // Update the CSS code displayed in the textarea
    updateCode(boxShadow);
}

/**
 * Helper function to retrieve shadow parameters from input values.
 * Converts input values into usable data types and returns an array.
 * @returns {Array} - [hShadow, vShadow, blurRadius, spreadRadius, shadowColor, shadowOpacity, shadowInset]
 */
function getShadowParams() {
    const hShadow = parseInt(document.getElementById("h-shadow").value); // Horizontal shadow
    const vShadow = parseInt(document.getElementById("v-shadow").value); // Vertical shadow
    const blurRadius = parseInt(document.getElementById("blur-radius").value); // Blur radius
    const spreadRadius = parseInt(document.getElementById("spread-radius").value); // Spread radius
    const shadowColor = document.getElementById("shadow-color").value; // Hex color input
    const shadowColorOpacity = parseFloat(
        document.getElementById("shadow-color-opacity").value
    ).toFixed(1); // Opacity with 1 decimal place
    const shadowInset = document.getElementById("shadow-inset").checked; // Checkbox for inset shadow

    // Return an array containing all the parameters
    return [hShadow, vShadow, blurRadius, spreadRadius, shadowColor, shadowColorOpacity, shadowInset];
}

/**
 * Generates a box-shadow CSS property string.
 * @param {number} hShadow - Horizontal shadow offset
 * @param {number} vShadow - Vertical shadow offset
 * @param {number} blurRadius - Blur radius
 * @param {number} spreadRadius - Spread radius
 * @param {string} color - Shadow color in hex format
 * @param {number} opacity - Opacity value between 0 and 1
 * @param {boolean} inset - Whether the shadow is inset
 * @returns {string} - Generated box-shadow CSS string
 */
function createBoxShadow(hShadow, vShadow, blurRadius, spreadRadius, color, opacity, inset) {
    // If 'inset' is true, add the "inset" keyword; otherwise, keep it empty
    const shadow = inset ? "inset" : "";

    // Convert the hex color and opacity to an rgba color
    const rgbaColor = hexToRgba(color, opacity);

    // Return the box-shadow string in proper CSS format
    return `${shadow} ${hShadow}px ${vShadow}px ${blurRadius}px ${spreadRadius}px ${rgbaColor}`;
}

/**
 * Converts a hex color code to an RGBA format string.
 * @param {string} color - Hex color code (e.g., "#ffee22")
 * @param {number} opacity - Opacity value (0 to 1)
 * @returns {string} - RGBA color string (e.g., "rgba(255,238,34,0.5)")
 */
function hexToRgba(color, opacity) {
    // Extract and convert the red (r), green (g), and blue (b) components from the hex color
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);

    // Return the rgba color string
    return `rgba(${r},${g},${b},${opacity})`;
}

/**
 * Applies the generated box-shadow CSS string to the specified HTML element.
 * @param {HTMLElement} element - The element to which the shadow will be applied
 * @param {string} boxShadow - The box-shadow CSS string
 */
function applyShadow(element, boxShadow) {
    element.style.boxShadow = boxShadow; // Apply the CSS string to the 'boxShadow' property
}

/**
 * Updates the displayed CSS code in the textarea.
 * @param {string} text - The box-shadow CSS string
 */
function updateCode(text) {
    code.textContent = `box-shadow: ${text}`;
}

/**
 * Copies the box-shadow CSS code from the textarea to the clipboard.
 * Displays an alert message on successful copy.
 */
/**
 * Copies the box-shadow CSS code from the textarea to the clipboard.
 * Displays a confirmation alert or error message.
 */
function copyCode() {
    const codeText = code.textContent; // Retrieve the text content from the textarea
    
    // Check if the Clipboard API is available
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(codeText)
            .then(() => {
                alert("Code copied to clipboard!");
            })
            .catch((err) => {
                console.error("Failed to copy text: ", err);
                alert("Failed to copy text. Please try again.");
            });
    } else {
        // Fallback method for browsers that don't support Clipboard API
        const textArea = document.createElement("textarea"); // Create a temporary textarea
        textArea.value = codeText; // Set the value to the code text
        textArea.style.position = "absolute";
        textArea.style.left = "-9999px"; // Move it off-screen
        document.body.appendChild(textArea); // Append to the body
        
        textArea.select(); // Select the text
        try {
            document.execCommand("copy"); // Attempt to copy using execCommand
            alert("Code copied to clipboard!");
        } catch (err) {
            console.error("Fallback: Copy failed", err);
            alert("Fallback: Failed to copy text. Please try again.");
        }
        document.body.removeChild(textArea); // Clean up temporary textarea
    }
}


// Call generateShadow on page load to initialize the box shadow
window.onload = generateShadow;
