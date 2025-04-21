async function loadTasks() {
    const response = await fetch('/todos');
    const tasks = await response.json();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
        <span onclick="toggleTask(${task.id}, ${!task.completed})">${task.task}</span>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Видалити</button>
      `;
        taskList.appendChild(li);
    });
}

async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();
    if (!task) return;
    await fetch('/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task })
    });
    taskInput.value = '';
    loadTasks();
}

async function toggleTask(id, completed) {
    await fetch(`/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed })
    });
    loadTasks();
}

async function deleteTask(id) {
    await fetch(`/todos/${id}`, {
        method: 'DELETE'
    });
    loadTasks();
}

// Завантажуємо задачі при старті
loadTasks();