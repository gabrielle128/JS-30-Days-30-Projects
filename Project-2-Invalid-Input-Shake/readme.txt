How It Works

1. User Interaction:
- The user clicks a button or triggers an event that calls validateInput().

2. Validation:
- The function checks if the input field is empty.

3. Error Handling:
- If empty:
    - Changes the placeholder to "Input some text".
    - Animates the field using the shake effect.
    - Displays an error message for 500ms.
- If not empty:
    - Shows an alert confirming valid input.

4. Feedback:
- After 500ms, the error message disappears, and the shake animation stops.