// Reference to the <p> element that will display the character count
const count = document.querySelector("p");

// Reference to the <input> element where the user types text
const input = document.querySelector("input");

// Add an event listener to the input field that triggers on every 'keyup' event
input.addEventListener('keyup', () => {
    // Update the content of the <p> element with the current length of the input's value
    count.innerHTML = input.value.length;
});
