const STORAGE_KEY = 'Tasks';
const $ = document.querySelector.bind(document);
const addButton = $('.add-task.button');
const deleteAllButton = $('.delete-all');
const taskList = $('.task-list');
const taskNameInput = $('.task-name input');
let allTasks = [];

//Task class
class Task {
    constructor(id, name, trashed) {
        this.id = id;
        this.name = name;
        this.trashed = trashed;
    }
}

//Add new task with user clicks add button
addButton.addEventListener('click', function () {
    if (taskNameInput.value !== '') {
        addTask();
    }
});

var addButton = new Vue ({
    
})

//Task Component
Vue.component('task', {
    template: `<div class="task odd"><span>${task.name}</span><div class="actions"><input class="trashed" id="checkBox" data-trashed-task-id="${task.id}" type="checkbox"><button class="delete button" type="button" data-delete-task-id="${task.id}">Delete</button></div></div>`
})

var task = new Vue({
    el: '.task-list',
})