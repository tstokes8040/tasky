const STORAGE_KEY = 'Tasks';

//Task class
class Task {
    constructor(id, name, trashed) {
        this.id = id;
        this.name = name;
        this.trashed = trashed;
    }
}

//When DOM content has loaded
window.addEventListener('DOMContentLoaded', function () {
    const $ = document.querySelector.bind(document);
    const addButton = $('.add-task.button');
    const deleteAllButton = $('.delete-all');
    const taskList = $('.task-list');
    const taskNameInput = $('.task-name input');
    let allTasks = [];

    //Add new task with user clicks add button
    addButton.addEventListener('click', function () {
        if (taskNameInput.value !== '') {
            addTask();
        }
    });

    //Listen for the delete ALL button
    deleteAllButton.addEventListener('click', function () {
        deleteAllTasks();
    });

    //Add a task when enter key is pressed
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' && $('.task-name input').value !== '') {
            addTask();
        }
    });

    //Add a new task to local storage
    function addTask() {
        let nextTaskID = allTasks.length;
        let taskName = $('.task-name input');
        const theTask = new Task(nextTaskID, taskName.value, false);
        allTasks.push(theTask);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allTasks));
        outputHTML(theTask);
        taskName.value = "";
        //Adding event handler for the new delete and trashed buttons
        deleteButton(theTask.id);
        trashed(theTask.id);
    }

    //Add event handler for single delete button
    function deleteButton(id) {
        const taskID = id;
        const deleteButton = $(`[data-delete-task-id="${taskID}"]`);
        deleteButton.addEventListener('click', function (event) {
            event.preventDefault();
            allTasks.splice(allTasks.indexOf(taskID), 1);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(allTasks));
            this.closest('.task').remove();
        });
    }

    //Add event handler for single mark done checkbox
    function trashed(id) {
        const taskID = id;
        const trashed = $(`[data-trashed-task-id="${taskID}"]`);
        trashed.addEventListener('change', function () {
            if (this.checked) {
                allTasks[taskID].trashed = true;
                trashed.parentElement.parentElement.classList.toggle("is-trashed");
                localStorage.setItem(STORAGE_KEY, JSON.stringify(allTasks));
            }
            else {
                allTasks[taskID].trashed = false;
                trashed.parentElement.parentElement.classList.toggle("is-trashed");
                localStorage.setItem(STORAGE_KEY, JSON.stringify(allTasks));
            }
        });
    }

    //Get all tasks from local storage
    function getAllTasks() {
        if (localStorage.length > 0) {
            const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY));
            for (let i = 0; i < tasks.length; i++) {
                let nextTask = new Task(tasks[i].id, tasks[i].name, tasks[i].trashed);
                allTasks.push(nextTask);
                outputHTML(nextTask);
                //Adding event handler for the new delete and trashed buttons
                deleteButton(i);
                trashed(i);
            }
        }
    }

    //Delete all tasks
    function deleteAllTasks() {
        allTasks = [];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allTasks));
        taskList.innerHTML = '';
    }

    //Output the task
    function outputHTML(task) {
        if (task.trashed) {
            if (task.id % 2 === 0) {
                taskList.insertAdjacentHTML(`beforeend`, `<div class="task is-trashed even"><span>${task.name}</span><div class="actions"><input class="trashed" id="checkBox" data-trashed-task-id="${task.id}" type="checkbox" checked><button class="delete button" type="button" data-delete-task-id="${task.id}">Delete</button></div></div>`);
            }
            else {
                taskList.insertAdjacentHTML(`beforeend`, `<div class="task is-trashed odd"><span>${task.name}</span><div class="actions"><input class="trashed" id="checkBox" data-trashed-task-id="${task.id}" type="checkbox" checked><button class="delete button" type="button" data-delete-task-id="${task.id}">Delete</button></div></div>`);
            }
        }
        else {
            if (task.id % 2 === 0) {
                taskList.insertAdjacentHTML(`beforeend`, `<div class="task even"><span>${task.name}</span><div class="actions"><input class="trashed" id="checkBox" data-trashed-task-id="${task.id}" type="checkbox"><button class="delete button" type="button" data-delete-task-id="${task.id}">Delete</button></div></div>`);
            }
            else {
                taskList.insertAdjacentHTML(`beforeend`, `<div class="task odd"><span>${task.name}</span><div class="actions"><input class="trashed" id="checkBox" data-trashed-task-id="${task.id}" type="checkbox"><button class="delete button" type="button" data-delete-task-id="${task.id}">Delete</button></div></div>`);
            }
        }
    }

    getAllTasks();
});
