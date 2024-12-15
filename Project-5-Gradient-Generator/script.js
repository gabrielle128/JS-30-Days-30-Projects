// Select input elements for the color values by their IDs
const colorOne = document.getElementById("color-a"); // First color input element
const colorTwo = document.getElementById("color-b"); // Second color input element

// Current direction for the gradient; initialized with 'to bottom'
let currentDirection = 'to bottom';

// Textarea element where the generated CSS gradient code will be displayed
let outputCode = document.getElementById("code");

/**
 * Function to set the direction of the linear gradient
 * @param {string} value - The gradient direction value (e.g., 'to right', 'to bottom')
 * @param {HTMLElement} _this - The button element that triggered this function
 */
function setDirection(value, _this) {
    // Select all buttons inside the .buttons container
    let directions = document.querySelectorAll(".buttons button");
    
    // Remove the 'active' class from all direction buttons
    for (let i of directions) {
        i.classList.remove("active");
    }

    // Add the 'active' class to the clicked button to highlight it
    _this.classList.add("active");

    // Update the current direction variable with the selected direction
    currentDirection = value;
}

/**
 * Function to generate the gradient CSS code and apply it to the body background
 */
function generateCode() {
    // Set the value of the textarea to display the gradient CSS code
    outputCode.value = `background: linear-gradient(${currentDirection}, ${colorOne.value}, ${colorTwo.value});`;

    // Apply the generated gradient as the background style of the body element
    document.getElementsByTagName("BODY")[0].style.background = 
        `linear-gradient(${currentDirection}, ${colorOne.value}, ${colorTwo.value})`;
}

/**
 * Function to copy the generated gradient code to the clipboard
 */
function copyText() {
    // Check if Clipboard API is supported in the browser
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(outputCode.value)
            .then(() => {
                alert('Gradient Copied!'); // Success feedback
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
                alert('Failed to copy text. Please try again!');
            });
    } else {
        // Fallback for older browsers without Clipboard API
        let tempTextarea = document.createElement("textarea"); // Create a temporary textarea element
        tempTextarea.value = outputCode.value; // Set its value to the gradient code
        document.body.appendChild(tempTextarea); // Append it to the body temporarily
        tempTextarea.select(); // Select the text inside the textarea

        try {
            // Execute the copy command
            document.execCommand("copy");
            alert('Gradient Copied!'); // Success feedback
        } catch (err) {
            console.error('Fallback: Unable to copy text', err);
            alert('Failed to copy text.');
        }

        // Clean up: remove the temporary textarea element
        document.body.removeChild(tempTextarea);
    }
}

// Generate the gradient code initially when the page loads
generateCode();
