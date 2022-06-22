const addNotesBtn = document.getElementById("addNotesbtn");
const noteModal = document.getElementById("noteModal");
const closeNoteModalBtn = document.getElementById("closeNoteModalBtn");
const addNoteModalBtn = document.getElementById("addNoteModalBtn");
const titleInput = document.getElementById("noteTitleInput");
const bodyInput = document.getElementById("noteBodyInput");
const closeEditModalBtn = document.getElementById("closeEditModalBtn");
const editNoteModalBtn = document.getElementById("editNoteModalBtn");
const editNoteModal = document.getElementById("editNoteModal");

const notes = [];

function createNote(title, body) {
  const noteContainer = document.getElementById("notesAddedContainer");
  const note = document.createElement("div");
  note.classList.add("col-1", "card", "myNote");
  note.innerHTML = `
    <div class="card-header bg-dark d-flex justify-content-between">
      <span id="title"  class="text-white">${title}</span>
      <div class="">
        <i id="editNoteBtn" class="bx bxs-edit text-white" onclick="showEditModal(this)"></i>
        <i id="removeNoteBtn" class="bx bx-trash text-white" onclick="removeNote(this)"></i>
      </div>
    </div>
    <div class="card-body">
      <span>${body}</span>
    </div>
  `;
  noteContainer.appendChild(note);
}

function showEditModal(htmlElement) {
  editNoteModal.classList.add("d-block");

  editNoteModalBtn.addEventListener("click", () => {
    editNote(htmlElement);
  });
}

function editNote(htmlElement) {
  // const note = htmlElement.parentNode.parentNode.parentNode;
  const noteIndentifier =
    htmlElement.parentNode.previousElementSibling.innerText;

  const note = notes.find(note => note.title === noteIndentifier);

  note.title = document.getElementById("editNoteTitleInput").value;
  note.body = document.getElementById("editNoteBodyInput").value;

  updateNotes();
}

function removeNote(htmlElement) {
  const noteIndentifier =
    htmlElement.parentNode.previousElementSibling.innerText;

  const noteIndex = notes.findIndex(note => note.title === noteIndentifier);
  notes.splice(noteIndex, 1);

  updateNotes();
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

closeEditModalBtn.addEventListener("click", () => {
  editNoteModal.classList.remove("d-block");
});

addNotesBtn.addEventListener("click", () => {
  noteModal.classList.add("d-block");
});

closeNoteModalBtn.addEventListener("click", () => {
  noteModal.classList.remove("d-block");
});

addNoteModalBtn.addEventListener("click", () => {
  setNote();
  updateNotes();
  console.log("on");
});
