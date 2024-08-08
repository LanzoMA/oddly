let tasks = []

function addTask(inputBox) {
    if (inputBox.value == '') return;

    tasks.push(inputBox.value)
    inputBox.value = ''

    let taskHtml = '<div id="taskView">'

    for (let i = 0; i < tasks.length; i++) {
        taskHtml += `<div class="task">${tasks[i]}</div>`
    }

    taskHtml += '</div>'

    document.getElementById('taskView').innerHTML = taskHtml
}