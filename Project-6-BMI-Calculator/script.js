// Function to update the displayed height value based on the slider input
function updateHeightValue(value) {
    // Find the span element with ID 'height-value' and update its text content
    // This displays the current height value in cm
    document.getElementById("height-value").textContent = value;
}

// Function to update the displayed weight value based on the slider input
function updateWeightValue(value) {
    // Find the span element with ID 'weight-value' and update its text content
    // This displays the current weight value in kg
    document.getElementById("weight-value").textContent = value;
}

// Function to calculate the Body Mass Index (BMI)
function calculateBMI() {
    // Retrieve values from input fields for height, weight, and age
    const height = document.getElementById("height").value; // Height in cm
    const weight = document.getElementById("weight").value; // Weight in kg
    const age = document.getElementById("age").value;       // Age in years
    
    // Retrieve the selected gender from radio buttons (only one should be selected)
    const gender = document.querySelector("input[name='gender']:checked");

    // Check if age or gender is not specified, and alert the user
    if (!age || !gender) {
        alert("Please fill in all fields.");
        return; // Exit the function early
    }

    // Calculate BMI using the formula: weight (kg) / (height (m))^2
    // Since height is in cm, divide by 100 to convert it to meters
    const bmi = (weight / ((height / 100) ** 2)).toFixed(2); // Round to 2 decimal places

    // Display the calculated BMI value in the element with ID 'bmi-result'
    document.getElementById("bmi-result").textContent = bmi;

    // Determine the BMI category based on standard BMI ranges
    let category = "";

    if (bmi < 18.5) {
        category = "Underweight"; // BMI < 18.5
    } else if (bmi < 24.9) {
        category = "Normal Weight"; // BMI between 18.5 and 24.9
    } else if (bmi < 29.9) {
        category = "Overweight"; // BMI between 25.0 and 29.9
    } else {
        category = "Obese"; // BMI >= 30.0
    }

    // Display the BMI category in the element with ID 'bmi-category'
    document.getElementById("bmi-category").textContent = category;
}