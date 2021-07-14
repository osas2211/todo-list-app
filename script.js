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
}

function addTask(e){
    if (taskInput.value === ""){
        alert("Please Input a Task")
    }

    const task = document.createElement("li");
    task.className = "task"
    const text = document.createTextNode(taskInput.value);
    task.append(text);
    const div = document.createElement("div");
    div.className = "action";
    div.innerHTML = '<a href="#" class="delete-task">Del</a> <a href="#" class="finish-task">Done</a>';
    task.append(div);
    tasks.append(task);

    e.preventDefault();
};

function delTask(e){
    if (e.target.classList.contains("delete-task")){
        e.target.parentElement.parentElement.remove()
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

    e.preventDefault();
}    
    

loadEvents();

