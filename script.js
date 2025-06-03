document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const taskCounter = document.getElementById('taskCounter');
    
    let tasks = [];
    
    // Add task event listener
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;
        
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        
        tasks.push(task);
        renderTasks();
        taskInput.value = '';
        updateTaskCounter();
    }
    
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item';
            li.dataset.id = task.id;
            
            const taskTextSpan = document.createElement('span');
            taskTextSpan.className = 'task-text';
            if (task.completed) {
                taskTextSpan.classList.add('completed');
            }
            taskTextSpan.textContent = task.text;
            
            taskTextSpan.addEventListener('click', function() {
                toggleTaskCompletion(task.id);
            });
            
            const taskActions = document.createElement('div');
            taskActions.className = 'task-actions';
            
            const editBtn = document.createElement('button');
            editBtn.className = 'edit-btn';
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', function() {
                editTask(task.id);
            });
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', function() {
                deleteTask(task.id);
            });
            
            taskActions.appendChild(editBtn);
            taskActions.appendChild(deleteBtn);
            
            li.appendChild(taskTextSpan);
            li.appendChild(taskActions);
            
            taskList.appendChild(li);
        });
    }
    
    function toggleTaskCompletion(taskId) {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            renderTasks();
            updateTaskCounter();
        }
    }
    
    function editTask(taskId) {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            const newText = prompt('Edit your task:', task.text);
            if (newText !== null && newText.trim() !== '') {
                task.text = newText.trim();
                renderTasks();
            }
        }
    }
    
    function deleteTask(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            tasks = tasks.filter(task => task.id !== taskId);
            renderTasks();
            updateTaskCounter();
        }
    }
    
    function updateTaskCounter() {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;
        taskCounter.textContent = `${completedTasks} of ${totalTasks} tasks completed`;
    }
});