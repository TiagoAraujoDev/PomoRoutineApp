const addNotesBtn = document.getElementById("addNotesbtn");
const noteModal = document.getElementById("noteModal");
const closeEditModalBtn = document.getElementById("closeEditModalBtn");
const addNoteModalBtn = document.getElementById("addNoteModalBtn");
const titleInput = document.getElementById("noteTitleInput");
const bodyInput = document.getElementById("noteBodyInput");

const notes = [];

function createNote(title, body) {
  const noteContainer = document.getElementById("notesAddedContainer");
  const note = document.createElement("div");
  note.classList.add("col-1", "card", "myNote");
  note.innerHTML = `
    <div class="card-header bg-dark d-flex justify-content-between">
      <span class="text-white">${title}</span>
      <div class="">
        <i class="bx bxs-edit text-white"></i>
        <i class="bx bx-trash text-white"></i>
      </div>
    </div>
    <div class="card-body">
      <span>${body}</span>
    </div>
  `;
  noteContainer.appendChild(note);
}

function setNote() {
  const note = {
    title: "",
    body: "",
  };

  note.title = titleInput.value;
  note.body = bodyInput.value;

  notes.push(note);
}

function cleanNotes() {
  const notes = document.getElementById("notesAddedContainer");
  while (notes.firstChild) {
    notes.removeChild(notes.lastChild);
  }
}

function updateNotes() {
  cleanNotes();

  notes.forEach(note => createNote(note.title, note.body));
}

addNotesBtn.addEventListener("click", () => {
  noteModal.classList.add("d-block");
});

closeEditModalBtn.addEventListener("click", () => {
  noteModal.classList.remove("d-block");
});

addNoteModalBtn.addEventListener("click", () => {
  setNote();
  updateNotes();
  console.log("on");
});
