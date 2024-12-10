// script.js
document.getElementById('addTaskBtn').addEventListener('click', addTask);

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    const listItem = document.createElement('li');
    listItem.className = 'task';
    listItem.innerHTML = `
      <span>${taskText}</span>
      <button onclick="deleteTask(this)"><i class="fa fa-trash" aria-hidden="true"></i></button>
      <button onclick="completeTask(this)"><i class="fa fa-check-circle" aria-hidden="true"></i></button>
    `;

    taskList.appendChild(listItem);
    taskInput.value = '';
  }
}

function deleteTask(button) {
  const task = button.parentElement;
  task.remove();
}

function completeTask(button) {
  const task = button.parentElement;
  task.classList.toggle('completed');
}
