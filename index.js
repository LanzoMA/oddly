const addTaskInput = document.getElementById('addTaskInput')

let tasks = []

class Task {
    static tasksCreated = 0;

    constructor(title, description) {
        this.id = 'TASK_' + Task.tasksCreated;
        this.title = title;
        this.description = description;
        this.isComplete = false;
        Task.tasksCreated++;
    }
}

function addTask() {
    const newTaskTitle = addTaskInput.value;

    if (newTaskTitle == '') return;

    const newTask = new Task(newTaskTitle, '');

    tasks.push(newTask)
    addTaskInput.value = ''

    let tasksHtml = '<div id="tasks">'

    for (task of tasks) {
        tasksHtml += '<div class="task">';
        tasksHtml += `<input id="${task.id}" type="checkbox">`;
        tasksHtml += `<label for="${task.id}">${task.title}</label>`;
        tasksHtml += '</div>';
    }

    tasksHtml += '</div>';

    document.getElementById('tasks').innerHTML = tasksHtml;
}