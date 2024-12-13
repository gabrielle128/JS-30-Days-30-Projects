function validateInput(){

    let inputField = document.getElementById("inputField");

    // gets the value entered in the input field and removes any leading or trailing whitespace
    let inputValue = inputField.value.trim();

    const errorMessage = document.getElementById("errorMessage");

    // checks if the inputValue is empty string
    if(inputValue === ""){

        // change placeholder text after shake
        inputField.placeholder = "Input Some Text"

        // add shake class and display error message
        inputField.classList.add("shake");
        errorMessage.style.visibility = "visible";

        // remove shake class and hide error message after a delay (milliseconds)
        setTimeout(function(){
            inputField.classList.remove("shake");
            errorMessage.style.visibility = "hidden";
        },500);
    }

    else{
        alert("Valid Inputs")
    }
}

