function addTask(event, inputId, listId, dateId = null) {
    event.preventDefault();
    const taskInput = document.getElementById(inputId);
    const taskText = taskInput.value.trim();
    let taskDate = "";
 
    if (dateId) {
      const dateInput = document.getElementById(dateId);
      taskDate = dateInput.value.trim();
    }
    if (taskText !== "") {
      const taskList = document.getElementById(listId);
      const newTask = document.createElement('li');
      newTask.innerHTML = `
        <label>
          <input
            type="checkbox"
            
onclick="this.parentElement.parentElement.classList.toggle('completed')"
          />
          ${taskText}
        </label>
        ${taskDate ? `<span>${taskDate}</span>` : ""}
        <button class="delete-button" onclick="this.parentElement.remove()">
          Delete
        </button>
      `;
      taskList.appendChild(newTask);
      taskInput.value = "";
      if (dateId) {
        const dateInput = document.getElementById(dateId);
        dateInput.value = "";
      }
    }
  }
  document.getElementById('task-form').addEventListener('submit', function 
(event) {
    addTask(event, 'new-task', 'todo-list');
  });
  document.getElementById('upcoming-form').addEventListener('submit', function 
(event) {
    addTask(event, 'new-upcoming-task', 'upcoming-task-list', 
'upcoming-task-date');
  });
  document.getElementById("toggle").addEventListener('click',()=>{
    const dark = document.getElementById("toggle");
    document.body.classList.toggle("dark");
  })
//   // Get the toggle button
// const toggleButton = document.getElementById('toggle');

// Function to toggle dark mode

