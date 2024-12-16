// Select the "Add Note" button element and the container where notes are displayed
const btnEl = document.getElementById("btn"); // Button to add a new note
const appEl = document.getElementById("App"); // Container where all notes are added

/**
 * On page load, retrieve all existing notes from localStorage,
 * create their corresponding elements, and display them.
 */
getNotes().forEach((note) => {
    const noteEl = createNoteEl(note.id, note.content); // Create note element for each note
    appEl.insertBefore(noteEl, btnEl); // Insert the note element before the "Add Note" button
});

/**
 * Function to create a note element (a textarea) for displaying/editing notes.
 * @param {number} id - Unique ID for the note
 * @param {string} content - The note content
 * @returns {HTMLTextAreaElement} - The created note element
 */
function createNoteEl(id, content) {
    const element = document.createElement("textarea"); // Create a textarea element
    element.classList.add("note"); // Add "note" class for styling
    element.placeholder = "Empty Note"; // Default placeholder for new notes
    element.value = content; // Set the note content

    /**
     * Add a double-click event to confirm and delete a note.
     */
    element.addEventListener("dblclick", () => {
        const warning = confirm("Do you want to delete this note?"); // Ask for confirmation
        if (warning) {
            deleteNote(id, element); // Delete the note if confirmed
        }
    });

    /**
     * Add an input event to save changes when the note content is updated.
     */
    element.addEventListener("input", () => {
        updateNote(id, element.value); // Update the note content in localStorage
    });

    return element; // Return the created note element
}

/**
 * Function to delete a note.
 * @param {number} id - The ID of the note to delete
 * @param {HTMLElement} element - The note element to remove from the DOM
 */
function deleteNote(id, element) {
    // Filter out the note with the matching ID and save the updated notes list
    const notes = getNotes().filter((note) => note.id != id);
    saveNote(notes); // Save the updated notes to localStorage
    appEl.removeChild(element); // Remove the note element from the DOM
}

/**
 * Function to update the content of an existing note.
 * @param {number} id - The ID of the note to update
 * @param {string} content - The updated content of the note
 */
function updateNote(id, content) {
    const notes = getNotes(); // Retrieve all notes from localStorage
    const target = notes.filter((note) => note.id == id)[0]; // Find the note with the matching ID
    target.content = content; // Update the content of the note
    saveNote(notes); // Save the updated notes back to localStorage
}

/**
 * Function to add a new note.
 */
function addNote() {
    const notes = getNotes(); // Retrieve the existing notes from localStorage

    // Create a new note object with a random unique ID and empty content
    const noteObj = {
        id: Math.floor(Math.random() * 10000), // Generate a random ID
        content: "" // Empty content for a new note
    };

    // Create a new note element and insert it before the "Add Note" button
    const noteEl = createNoteEl(noteObj.id, noteObj.content);
    appEl.insertBefore(noteEl, btnEl);

    notes.push(noteObj); // Add the new note object to the notes array
    saveNote(notes); // Save the updated notes list to localStorage
}

/**
 * Function to save notes to localStorage.
 * @param {Array} notes - Array of note objects to save
 */
function saveNote(notes) {
    // Convert notes array to JSON and save it to localStorage
    localStorage.setItem("note-app", JSON.stringify(notes));
}

/**
 * Function to retrieve notes from localStorage.
 * @returns {Array} - An array of note objects
 */
function getNotes() {
    // Parse the notes stored in localStorage, or return an empty array if none exist
    return JSON.parse(localStorage.getItem("note-app") || "[]");
}

/**
 * Add a click event to the "Add Note" button to trigger the addNote() function.
 */
btnEl.addEventListener("click", addNote);
