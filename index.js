const addTaskTextInput = document.getElementById('addTaskTextInput');
const taskList = document.getElementById('taskList');

addTaskTextInput.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.keycode === 13) addTask();
})

let tasks = [];

let uncompletedTasks = [];
let completedTasks = [];

class Task {
    static tasksCreated = 0;

    constructor(title, description) {
        this.id = 'TASK_' + Task.tasksCreated;
        this.title = title;
        this.description = description;
        this.isComplete = false;
        Task.tasksCreated++;
    }

    get checked() {
        return (this.isComplete) ? 'checked' : '';
    }
}

function addTask() {
    const newTaskTitle = addTaskTextInput.value;

    if (newTaskTitle == '') {
        window.alert('Cannot create empty task');
        return;
    }

    const newTask = new Task(newTaskTitle, '');

    uncompletedTasks.push(newTask);
    addTaskTextInput.value = '';

    update();
}

function deleteTask(taskId) {
    uncompletedTasks = uncompletedTasks.filter(task => task.id != taskId);
    completedTasks = completedTasks.filter(task => task.id != taskId);
    update();
}

function toggleCheckTask(taskId, isChecked) {
    if (isChecked) {
        const task = completedTasks.find(task => task.id == taskId);
        completedTasks = completedTasks.filter(task => task.id != taskId);
        uncompletedTasks.push(task);
        task.isComplete = !task.isComplete;
    }

    else {
        const task = uncompletedTasks.find(task => task.id == taskId);
        uncompletedTasks = uncompletedTasks.filter(task => task.id != taskId);
        completedTasks.push(task);
        task.isComplete = !task.isComplete;
    }

    update();

}

function generateTaskHtml(task) {
    return `<div class="task">
            <input id="${task.id}" type="checkbox" ${task.checked} onclick="toggleCheckTask('${task.id}', ${task.isComplete})">
            <label for="${task.id}" class="task-title">${task.title}</label>
            <button onclick="deleteTask('${task.id}')" class="remove-btn">Remove</button>
        </div>`;
}

function update() {
    let tasksHtml = '';

    if (uncompletedTasks.length == 0 && completedTasks.length == 0) {
        tasksHtml = '<p class="task">No tasks to do</p>'
        taskList.innerHTML = tasksHtml;
        return;
    }

    if (uncompletedTasks != 0) {
        tasksHtml += '<h2 class="task-heading">To Do</h2>';
        for (task of uncompletedTasks) tasksHtml += generateTaskHtml(task);
    }

    if (completedTasks.length != 0) {
        if (uncompletedTasks != 0) tasksHtml += '<br><hr>';

        tasksHtml += '<h2 class="task-heading">Completed</h2>';
        for (task of completedTasks) tasksHtml += generateTaskHtml(task);
    }

    taskList.innerHTML = tasksHtml;
}