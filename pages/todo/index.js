const addTaskBtn = document.getElementById("addTaskBtn");
const closeTaskModalBtn = document.getElementById("closeTaskModalBtn");
const addTaskModalBtn = document.getElementById("addTaskModalBtn");
const taskModal = document.getElementById("taskModal");
const editTaskModal = document.getElementById("editTaskModal");
const editTaskInput = document.getElementById("editTaskInput");

const tasks = [];

function createTask(task, status) {
  const taskElement = document.createElement("div");
  taskElement.classList.add("d-flex", "justify-content-between");

  taskElement.innerHTML = `
        <div class="d-flex align-items-center">
          <input id="taskCheckbox" class="form-check-input" type="checkbox" onchange="checkTask(this)" ${status}>
          <span class="ms-2">${task}</span>
        </div>
        <div">
          <i id="editTaskBtn" class="bx bx-edit" onclick="showEditTaskModal(this)"></i>
          <i id="removeTaskBtn" class="bx bx-trash" onclick="removeTask(this)"></i>
        </div>
    `;
  document.getElementById("tasks").appendChild(taskElement);
}

function setTask() {
  const taskInput = document.getElementById("taskInput");

  const taskObject = {
    taskDescription: "",
    status: "",
  };

  taskObject.taskDescription = taskInput.value;

  tasks.push(taskObject);
  taskInput.value = "";
}

function cleanTasks() {
  const tasks = document.getElementById("tasks");

  while (tasks.firstChild) {
    tasks.removeChild(tasks.lastChild);
  }
}

function updateTasks() {
  cleanTasks();

  tasks.forEach(item => createTask(item.taskDescription, item.status));
}

function updatePercentage() {
  const progressPercentage = document.getElementById("progressPercentage");
  let taskCheckedCounter = 0;

  const tasksArr = document.querySelectorAll("#taskCheckbox");

  if (tasksArr.length != 0) {
    for (let index in tasksArr) {
      if (tasksArr[index].checked) {
        taskCheckedCounter++;
      }
    }
    let porcentage = (100 / tasksArr.length) * taskCheckedCounter;

    progressPercentage.style.width = `${porcentage.toFixed(2)}%`;
    progressPercentage.innerText = `${porcentage.toFixed(2)}%`;
  } else {
    progressPercentage.style.width = "0%";
    progressPercentage.innerText = "0%";
  }
}

function checkTask(taskSelected) {
  const taskText = taskSelected.nextElementSibling.innerText;

  const taskIndex = tasks.findIndex(task => task.taskDescription === taskText);
  if (tasks[taskIndex].status === "") {
    tasks[taskIndex].status = "checked";
  } else {
    tasks[taskIndex].status = "";
  }

  updateTasks();
  updatePercentage();
}

function editTask(htmlElement) {
  const taskText =
    htmlElement.parentNode.previousElementSibling.childNodes[3].innerText;

  const taskIndex = tasks.findIndex(task => task.taskDescription === taskText);

  tasks[taskIndex].taskDescription = editTaskInput.value;

  updateTasks();
  updatePercentage();
}

function showEditTaskModal(htmlElement) {
  editTaskModal.classList.add("d-block");
  const editChanges = document.getElementById("editTaskModalBtn");
  editChanges.addEventListener("click", () => {
    editTask(htmlElement);
    editTaskModal.classList.remove("d-block");
  });
}

function removeTask(htmlElement) {
  const taskText =
    htmlElement.parentNode.previousElementSibling.childNodes[3].innerText;
  const taskIndex = tasks.findIndex(task => task.taskDescription === taskText);

  tasks.splice(taskIndex, 1);

  updateTasks();
  updatePercentage();
}

addTaskBtn.addEventListener("click", () => {
  taskModal.classList.add("d-block");
});

closeTaskModalBtn.addEventListener("click", () => {
  taskModal.classList.remove("d-block");
});

addTaskModalBtn.addEventListener("click", () => {
  setTask();
  updateTasks();
  updatePercentage();
});
