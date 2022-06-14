const addTaskBtn = document.getElementById('addTaskBtn');
const tasksContainer = document.getElementById('tasks');
const editTaskBtn = document.getElementById('editTaskBtn');
const removeTaskBtn = document.getElementById('removeTaskBtn');
const progressPercentage = document.getElementById('progressPercentage');
const taskInput = document.getElementById('taskInput');
const closeTaskModal = document.getElementById('closeTaskModal');
const addTaskModalBtn = document.getElementById('addTaskModalBtn');
const taskModal = document.getElementById('taskModal');

const tasks = [];
taskCounter = 0;

function updatePorcent() {
  let counter = 0;
  const taskCheckbox = document.querySelectorAll('#taskCheckbox');
  const tasksArr = [...taskCheckbox];
  if (tasksArr != 0) {
    for (let index in tasksArr) {
      if (tasksArr[index].checked) {
        counter++;
      }
    }
    let porcent = (100 / tasksArr.length) * counter;
    progressPercentage.style.width = `${porcent.toFixed(2)}%`;
    progressPercentage.innerText = `${porcent.toFixed(2)}%`;
  } else {
    progressPercentage.style.width = '0%';
    progressPercentage.innerText = '0%';
  }
}

function checkTask(el) {
  if (!el.childNodes[1].checked) {
    el.childNodes[1].checked = true;
    el.childNodes[3].classList.toggle('text-decoration-line-through');
    updatePorcent();
  } else {
    el.childNodes[1].checked = false;
    el.childNodes[3].classList.toggle('text-decoration-line-through');
    updatePorcent();
  }
}

function removeTask(el) {
  el.parentNode.parentNode.remove();
  tasks.pop();
  updatePorcent();
}
function createTask(index) {
  const after = document.getElementById('after');
  after.insertAdjacentHTML('afterend', tasks[index]);
}

function addTaskArray() {
  tasks.push(`
    <div class="d-flex justify-content-between">
      <div id="i" class="d-flex align-items-center" onclick="checkTask(this)">
        <input id="taskCheckbox" class="form-check-input" type="checkbox">
        <span class="ms-2" id="taskText">${taskInput.value}</span>
      </div>
      <div id="taskInteractions">
        <i id="editTaskBtn" class="bx bx-edit"></i>
        <i id="removeTaskBtn" class="bx bx-trash" onclick="removeTask(this)"></i>
      </div>
    </div>`);
}

addTaskBtn.addEventListener('click', () => {
  taskModal.classList.add('d-block');
});

closeTaskModal.addEventListener('click', () => {
  taskModal.classList.remove('d-block');
});

addTaskModalBtn.addEventListener('click', () => {
  addTaskArray();
  createTask(taskCounter);
  taskCounter++;
  taskInput.value = '';
});
