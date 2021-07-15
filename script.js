// UI VARIABLES

const taskForm = document.querySelector(".add-task");
const taskInput = document.querySelector("#task-input")
const tasks = document.querySelector(".collection");
const clearAll = document.querySelector("#clear-tasks");

// EVENTS

function loadEvents(){
    taskForm.addEventListener("submit", addTask);
    tasks.addEventListener("click", delTask);
    clearAll.addEventListener("click", clearTasks);
    document.addEventListener('DOMContentLoaded', getTasks);
}

function getTasks() {
    let tasks_;
    if(localStorage.getItem('tasks') === null){
      tasks_ = [];
    } else {
      tasks_ = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks_.forEach(function(todo){
        const task = document.createElement("li");
        task.className = "task"
        const text = document.createTextNode(todo);
        task.appendChild(text);
        const div = document.createElement("div");
        div.className = "action";
        div.innerHTML = '<a href="#" class="delete-task">Del</a>';
        task.appendChild(div);
        tasks.appendChild(task);
    });

  }


function addTask(e){
    if (taskInput.value === ""){
        alert("Please Input a Task")
    }

    else {
        const task = document.createElement("li");
        task.className = "task"
        const text = document.createTextNode(taskInput.value);
        task.appendChild(text);
        const div = document.createElement("div");
        div.className = "action";
        div.innerHTML = '<a href="#" class="delete-task">Del</a>';
        let finish = '<a href="#" class="finish-task">Done</a>'
        task.appendChild(div);
        tasks.appendChild(task);

        storeTaskInLocalStorage(taskInput.value);
    }
    
    taskInput.value = "";
    e.preventDefault();
};

function delTask(e){
    if (e.target.classList.contains("delete-task")){
        e.target.parentElement.parentElement.remove()

        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }

    else if(e.target.classList.contains("finish-task")){
        const text = e.target.parentElement.parentElement.innerText;
        e.target.parentElement.parentElement.innerHTML = `<strike> ${text} </strike> <a href="#" class="finish-task"><i class="fas fa-check-circle"></i></a>`;
    }

    e.preventDefault();
}

function clearTasks(e){
    while (tasks.firstChild){
        tasks.firstChild.remove();

    }

    clearTasksFromLocalStorage();

    e.preventDefault();
}    

function removeTaskFromLocalStorage(taskItem) {
    let tasks_;
    if(localStorage.getItem('tasks') === null){
      tasks_ = [];
    } else {
      tasks_ = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks_.forEach(function(task, index){
      if((taskItem.textContent).slice(0, -3) === task){
        tasks_.splice(index, 1);
      }
    });
  
    localStorage.setItem('tasks', JSON.stringify(tasks_));
  }
    

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks_;
    if(localStorage.getItem('tasks') === null){
      tasks_ = [];
    } else {
      tasks_ = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks_.push(task);
  
    localStorage.setItem('tasks', JSON.stringify(tasks_));
  }

function clearTasksFromLocalStorage() {
    localStorage.clear();
  }

  loadEvents();