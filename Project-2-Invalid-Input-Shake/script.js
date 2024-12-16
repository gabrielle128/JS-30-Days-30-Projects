/**
 * Function to validate user input in an input field.
 * It checks if the field is empty, provides feedback to the user, 
 * and displays an error message with a "shake" effect.
 */
function validateInput() {

    // Get the input field element by its ID
    let inputField = document.getElementById("inputField");

    // Get the value entered in the input field and remove leading/trailing whitespace
    let inputValue = inputField.value.trim();

    // Get the error message element by its ID
    const errorMessage = document.getElementById("errorMessage");

    // Check if the input field is empty
    if (inputValue === "") {

        // If the input is empty, change the placeholder text
        inputField.placeholder = "Input Some Text";

        // Add the "shake" class to the input field for a visual effect
        inputField.classList.add("shake");

        // Make the error message visible
        errorMessage.style.visibility = "visible";

        // Use setTimeout to remove the "shake" effect and hide the error message after 500ms
        setTimeout(function () {
            inputField.classList.remove("shake"); // Remove the shake class
            errorMessage.style.visibility = "hidden"; // Hide the error message
        }, 500); // Delay in milliseconds
    } 
    else {
        // If the input is not empty, show an alert for valid input
        alert("Valid Inputs");
    }
}
