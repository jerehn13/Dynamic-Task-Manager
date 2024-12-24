
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Add a new task
    function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText === '') {
        alert('Please enter a task!');
        return;
      }

      const taskItem = document.createElement('li');
      taskItem.innerHTML = `
        <span class="task-text">${taskText}</span>
        <div class="actions">
          <button class="edit" onclick="editTask(this)">Edit</button>
          <button class="delete" onclick="deleteTask(this)">Delete</button>
        </div>
      `;
      taskList.appendChild(taskItem);
      taskInput.value = ''; // Clear input field
    }

    // Edit a task
    function editTask(button) {
      const taskItem = button.closest('li');
      const taskText = taskItem.querySelector('.task-text');

      if (button.innerText === 'Edit') {
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = taskText.innerText;
        taskItem.insertBefore(editInput, taskText);
        taskText.style.display = 'none';
        button.innerText = 'Save';
      } else {
        const editInput = taskItem.querySelector('input');
        if (editInput.value.trim() === '') {
          alert('Task cannot be empty!');
          return;
        }
        taskText.innerText = editInput.value.trim();
        taskText.style.display = '';
        editInput.remove();
        button.innerText = 'Edit';
      }
    }

    // Delete a task
    function deleteTask(button) {
      const taskItem = button.closest('li');
      taskList.removeChild(taskItem);
    }

    // Toggle Dark Mode
    darkModeToggle.addEventListener('click', () => {
      body.classList.toggle('dark');
      if (body.classList.contains('dark')) {
        darkModeToggle.innerText = 'Disable Dark Mode';
      } else {
        darkModeToggle.innerText = 'Enable Dark Mode';
      }
    });
 
