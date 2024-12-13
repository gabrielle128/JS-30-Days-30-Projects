// Wait for the DOM content to be fully loaded before executing any JavaScript
// This ensures that all elements are available for manipulation

document.addEventListener("DOMContentLoaded", function() {

    // Define references to the input elements from the HTML
    const investmentInput = document.getElementById("investment"); // Investment amount slider
    const interestRateInput = document.getElementById("interest-rate"); // Interest rate slider
    const timePeriodInput = document.getElementById("time-period"); // Time period slider

    // Add event listeners to update the displayed values when input sliders are adjusted
    investmentInput.addEventListener("input", function() {
        updateInvestmentValue(this.value); // Update investment display
    });

    interestRateInput.addEventListener("input", function() {
        updateInterestRateValue(this.value); // Update interest rate display
    });

    timePeriodInput.addEventListener("input", function() {
        updateTimePeriodValue(this.value); // Update time period display
    });

    // Initialize the displayed values on page load using default slider values
    updateInvestmentValue(investmentInput.value);
    updateInterestRateValue(interestRateInput.value);
    updateTimePeriodValue(timePeriodInput.value);
});

/*
 * Updates the displayed investment value in the corresponding span element.
 * @param {string} value - The current value of the investment slider
 */
function updateInvestmentValue(value) {
    document.getElementById("investment-value").innerText = `₱${parseFloat(value).toLocaleString('en-PH')}`;
}

/*
 * Updates the displayed interest rate value in the corresponding span element.
 * @param {string} value - The current value of the interest rate slider
 */
function updateInterestRateValue(value) {
    document.getElementById("interest-rate-value").innerText = `${parseFloat(value).toFixed(1)}%`;
}

/*
 * Updates the displayed time period value in the corresponding span element.
 * @param {string} value - The current value of the time period slider
 */
function updateTimePeriodValue(value) {
    document.getElementById("time-period-value").innerText = value;
}

/*
 * Calculates the fixed deposit (FD) final value and interest earned based on user inputs.
 * Formula used: A = P * (1 + r/n)^(n*t)
 * A = Final amount, P = Principal, r = Annual interest rate, n = Compounding frequency, t = Time (years)
 */
function calculateFD() {
    // Retrieve input values and parse them to floating-point numbers
    const principal = parseFloat(document.getElementById("investment").value); // Initial investment amount
    const rateOfInterest = parseFloat(document.getElementById("interest-rate").value); // Annual interest rate
    const timePeriod = parseFloat(document.getElementById("time-period").value); // Time period in years

    // Define compounding frequency (quarterly compounding)
    const n = 4; 

    // Calculate total amount using compound interest formula
    const totalAmount = principal * Math.pow((1 + (rateOfInterest / 100) / n), n * timePeriod);

    // Calculate interest earned
    const interestEarned = totalAmount - principal;

    // Update the corresponding output span elements with calculated values
    document.getElementById("invested-amount").innerText = `₱${principal.toLocaleString('en-PH')}`;
    document.getElementById("estimated-returns").innerText = `₱${Math.round(interestEarned).toLocaleString('en-PH')}`;
    document.getElementById("total-value").innerText = `₱${Math.round(totalAmount).toLocaleString('en-PH')}`;
}