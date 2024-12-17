// Select all range slider elements on the page using querySelectorAll
const sliders = document.querySelectorAll("input[type='range']");

// Attach an "input" event listener to each slider to trigger the `calculateTip` function
sliders.forEach(function(slider) {
    slider.addEventListener("input", calculateTip);
});

// Get the reference of the bill input field and attach a "change" event listener to recalculate the tip
const billInput = document.getElementById("bill");
billInput.addEventListener("change", calculateTip);

/**
 * Function to calculate the tip, total bill, and amount per person.
 * Triggered when inputs (bill, sliders) are updated.
 */
function calculateTip() {
    // Retrieve the bill amount, tip percentage, and number of people splitting the bill
    let bill = parseFloat(billInput.value); // Convert bill input value to a float
    let tipPercent = document.getElementById("tip").value; // Get tip percentage value
    let noOfPeople = document.getElementById("no-of-people").value; // Get the number of people splitting the bill

    // Update the bill input to always display two decimal places
    billInput.value = bill.toFixed(2);

    // Calculate the total tip amount and round to 2 decimal places
    let totalTip = parseFloat((bill * (tipPercent / 100)).toFixed(2));

    // Calculate the total bill including the tip
    let total = parseFloat((bill + totalTip).toFixed(2));

    // Calculate how much tip each person pays
    let tipPerPerson = (totalTip / noOfPeople).toFixed(2);

    // Calculate the total amount each person pays
    let totalPerPerson = (total / noOfPeople).toFixed(2);

    // Display the calculated values in the relevant HTML elements
    document.getElementById("tip-amount").textContent = `₱${totalTip}`; // Total tip amount
    document.getElementById("total-amount").textContent = `₱${total}`; // Total bill amount (bill + tip)
    document.getElementById("tip-percent").textContent = `${tipPercent}%`; // Tip percentage
    document.getElementById("split-num").textContent = `${noOfPeople}`; // Number of people splitting
    document.getElementById("tip-per-person").textContent = `₱${tipPerPerson}`; // Tip per person
    document.getElementById("total-per-person").textContent = `₱${totalPerPerson}`; // Total amount per person
}

/**
 * Call the calculateTip function on page load to display default values.
 * This ensures the page does not start with empty or incorrect fields.
 */
calculateTip();
