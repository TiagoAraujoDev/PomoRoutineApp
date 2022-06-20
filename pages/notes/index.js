const addNotesBtn = document.getElementById("addNotesbtn");
const noteModal = document.getElementById("noteModal");
const closeEditModalBtn = document.getElementById("closeEditModalBtn");
const addNoteModalBtn = document.getElementById("addNoteModalBtn");

addNotesBtn.addEventListener("click", () => {
  noteModal.classList.add("d-block");
});

closeEditModalBtn.addEventListener("click", () => {
  noteModal.classList.remove("d-block");
});
