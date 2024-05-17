document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const message = document.getElementById('message');
    let messageTimeout;


    loadTasks();

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(taskInput.value);
        taskInput.value = '';
        message.textContent = ''; 
    });

    function addTask(task, completed = false) {
        const li = document.createElement('li');
        const taskText = document.createElement('span');
        taskText.textContent = task;
        taskText.classList.add('task-text');
        if (completed) {
            taskText.classList.add('completed');
        }

        const completeButton = document.createElement('button');
        completeButton.textContent = completed ? 'Uncomplete' : 'Complete';
        completeButton.classList.add('complete-button');
        completeButton.addEventListener('click', () => {
            taskText.classList.toggle('completed');
            if (taskText.classList.contains('completed')) {
                message.textContent = 'Woo-hoo 🎉';
                message.classList.add('show');
                clearTimeout(messageTimeout); 
                messageTimeout = setTimeout(() => {
                    message.classList.remove('show');
                }, 1000); 
                completeButton.textContent = 'Uncomplete';
            } else {
                message.textContent = '';
                message.classList.remove('show');
                completeButton.textContent = 'Complete';
                clearTimeout(messageTimeout); 
            }
            saveTasks();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(li);
            message.textContent = ''; 
            clearTimeout(messageTimeout); 
            saveTasks();
        });

        li.appendChild(taskText);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            const taskText = li.querySelector('.task-text').textContent;
            const completed = li.querySelector('.task-text').classList.contains('completed');
            tasks.push({ text: taskText, completed });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTask(task.text, task.completed));
    }
});
