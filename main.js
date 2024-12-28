document.addEventListener("DOMContentLoaded", () => {
    const addTaskButton = document.getElementById('add-task');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const filterSelect = document.getElementById('filter');
    const themeToggle = document.getElementById('theme-toggle');

    let tasks = loadTasksFromLocalStorage();

    
    addTaskButton.addEventListener('click', (e) => {
        e.preventDefault(); 
        const taskText = taskInput.value.trim(); 

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
        taskInput.value = ''; 
    });

    
    taskList.addEventListener('click', (event) => {
        const target = event.target;
        const taskItem = target.closest('.task-item');

        if (!taskItem) return; 

        const taskId = parseInt(taskItem.dataset.id, 10);

        if (target.classList.contains('complete-btn')) {
            toggleTaskCompletion(taskId);
        } else if (target.classList.contains('delete-btn')) {
            deleteTask(taskId);
        } else if (target.classList.contains('edit-btn')) {
            editTask(taskId);
        }
    });

    
    function toggleTaskCompletion(taskId) {
        const task = tasks.find((task) => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
            saveTasksToLocalStorage();
            renderTasks();
        }
    }

    
    function deleteTask(taskId) {
        tasks = tasks.filter((task) => task.id !== taskId);
        saveTasksToLocalStorage();
        renderTasks();
    }

    function editTask(taskId) {
        const task = tasks.find((task) => task.id === taskId);
        if (task) {
            const newText = prompt('Edit your task:', task.text);
            if (newText !== null && newText.trim() !== '') {
                task.text = newText.trim();
                saveTasksToLocalStorage();
                renderTasks();
            } else {
                alert('Task text cannot be empty!');
            }
        }
    }

   
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
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    </div>
                `;

                taskList.appendChild(taskItem);
            });
    }

    
    filterSelect.addEventListener('change', renderTasks);

   
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        }
    });

   
    function saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    
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

   
    document.body.classList.add('light-mode');
    renderTasks();
});

document.addEventListener('DOMContentLoaded', function () {
    var themeToggle = document.querySelector('#theme-toggle');
    var body = document.body;

   
    var savedTheme = localStorage.getItem('theme') || 'light-mode';

    
    body.classList.remove('dark-mode', 'light-mode');
    body.classList.add(savedTheme);

   
    themeToggle.checked = (savedTheme === 'dark-mode');

    
    themeToggle.addEventListener('change', function () {
        var isDarkMode = themeToggle.checked;
        var newTheme = isDarkMode ? 'dark-mode' : 'light-mode';

        
        body.classList.remove('dark-mode', 'light-mode');
        body.classList.add(newTheme);

        
        localStorage.setItem('theme', newTheme);
    });
});
