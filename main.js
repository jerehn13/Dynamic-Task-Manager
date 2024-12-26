document.addEventListener("DOMContentLoaded", () => {
    const addTaskButton = document.getElementById('add-task');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const filterSelect = document.getElementById('filter');
    const themeToggle = document.getElementById('theme-toggle');

    let tasks = loadTasksFromLocalStorage();

    // Add a new task
    addTaskButton.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent form submission
        const taskText = taskInput.value.trim(); // Trim to remove extra spaces

        if (taskText === '') {
            alert('Task cannot be empty!');
            return;
        }

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
        };

        tasks.push(newTask);
        saveTasksToLocalStorage();
        renderTasks();
        taskInput.value = ''; // Clear the input field
    });

    // Handle actions on the task list (Complete/Delete)
    taskList.addEventListener('click', (event) => {
        const target = event.target;
        const taskItem = target.closest('.task-item');

        if (!taskItem) return; // Ensure only valid task items are handled

        const taskId = parseInt(taskItem.dataset.id, 10);

        if (target.classList.contains('complete-btn')) {
            toggleTaskCompletion(taskId);
        } else if (target.classList.contains('delete-btn')) {
            deleteTask(taskId);
        }
    });

    // Toggle task completion
    function toggleTaskCompletion(taskId) {
        const task = tasks.find((task) => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
            saveTasksToLocalStorage();
            renderTasks();
        }
    }

    // Delete a task
    function deleteTask(taskId) {
        tasks = tasks.filter((task) => task.id !== taskId);
        saveTasksToLocalStorage();
        renderTasks();
    }

    // Render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        const filterValue = filterSelect.value;

        tasks
            .filter((task) => {
                if (filterValue === 'all') return true;
                if (filterValue === 'completed') return task.completed;
                if (filterValue === 'pending') return !task.completed;
                return false;
            })
            .forEach((task) => {
                const taskItem = document.createElement('li');
                taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
                taskItem.dataset.id = task.id;

                taskItem.innerHTML = `
                    <span>${task.text}</span>
                    <div>
                        <button class="complete-btn">${task.completed ? 'Undo' : 'Complete'}</button>
                        <button class="delete-btn">Delete</button>
                    </div>
                `;

                taskList.appendChild(taskItem);
            });
    }

    // Filter tasks
    filterSelect.addEventListener('change', renderTasks);

    // Toggle theme
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        }
    });

    // Save tasks to localStorage
    function saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from localStorage
    function loadTasksFromLocalStorage() {
        const savedTasks = localStorage.getItem('tasks');
        if (!savedTasks) return [];
        try {
            const parsedTasks = JSON.parse(savedTasks);
            return parsedTasks.filter(task => task.text && task.text.trim() !== ''); // Filter out invalid tasks
        } catch (e) {
            console.error('Error parsing tasks from localStorage', e);
            return [];
        }
    }

    // Initialize the app
    document.body.classList.add('light-mode');
    renderTasks();
});
