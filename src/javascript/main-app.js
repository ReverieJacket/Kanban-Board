const taskList = [];
const $taskCreator = document.getElementById('task-creator');
const $taskTitle = document.getElementById('title');
const $taskDescription = document.getElementById('description');
const $taskDeadline = document.getElementById('deadline');
const $newTaskTitle = document.getElementById('newTaskTitle');
const $editTaskTitle = document.getElementById('editTaskTitle');
const $newTaskButton = document.getElementById('save-task');
const $editTaskButton = document.getElementById('alter-task');
const $taskId = document.getElementById('taskId');
const $categoryId = document.getElementsByClassName('board-column');


function toggleTaskCreator(isEditMode) {
    $taskCreator.style.display = "flex";
    $newTaskTitle.style.display = isEditMode ? "none" : "block";
    $newTaskButton.style.display = isEditMode ? "none" : "block";
    $editTaskTitle.style.display = isEditMode ? "block" : "none";
    $editTaskButton.style.display = isEditMode ? "block" : "none";
}

function openTaskCreator(dataColumnId){
    console.log(dataColumnId);
    $categoryId.value = dataColumnId;
    toggleTaskCreator(false);  
}

function openTaskEditor(id){
    const task = taskList.find(task => task.id == id);
    if (task) {
        const { id, title, description, deadline, column } = task;
        $taskId.value = id;
        $taskTitle.value = title;
        $taskDescription.value = description;
        $taskDeadline.value = deadline;
        $categoryId.value = column;
    }
    toggleTaskCreator(true);  
}


function closeTaskCreator(){
    $taskCreator.style.display = "none";
    $taskTitle.value = "";
    $taskDescription.value = "";
    $taskDeadline.value = "";
    $categoryId.value = "";
}



function resetColumns() {
    const columnBodies = document.querySelectorAll('.category-body');
    columnBodies.forEach(columnBody => {
        columnBody.innerHTML = '';
    });
}

function generateTaskCards() {
    resetColumns();
    taskList.forEach(task => {
        const columnBody = document.querySelector(`[data-column-id="${task.column}"] .category-body`);
        const date = new Date(`${task.deadline}T00:00:00`);
        const formattedDate = new Intl.DateTimeFormat('pt-BR').format(date);
        
        const card = `
            <div class="task-card" id="${task.id}" ondblclick="openTaskEditor('${task.id}')" draggable="true" ondragstart="dragstartHandler(event)">
                <div class="card-info">
                    <span>${task.title}</span>
                </div>
                <div class="card-info">
                    <b>prazo: </b><span>${formattedDate}</span>
                    <button id="remove-task" onclick="removeTaskCard('${task.id}')">
                    <span class="material-symbols-outlined">delete</span> 
                </button>
                </div>
            </div>
        `;
        columnBody.innerHTML += card;
    });
}

 

function createTaskCard() {
    const title = $taskTitle.value;
    const deadline = $taskDeadline.value;
    const errorMessage = document.getElementById('error-message');
    
    if (!title || !deadline) {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Título e prazo são obrigatórios!";
        return; 
    }
    
    errorMessage.style.display = "none";

    const newTask = {
        id: crypto.randomUUID(),
        title,
        description: $taskDescription.value,
        deadline,
        column: $categoryId.value
    };

    taskList.push(newTask);
    closeTaskCreator();
    generateTaskCards();
}

function updateTaskCard() {
    const task = taskList.find(task => task.id === $taskId.value); 
    if (task) {
        task.title = $taskTitle.value;
        task.description = $taskDescription.value;
        task.deadline = $taskDeadline.value;
        task.column = $categoryId.value;
    }
    closeTaskCreator();
    generateTaskCards();
}


function removeTaskCard(taskId) {
    taskList.splice(taskList.findIndex(task => task.id === taskId), 1);
    generateTaskCards();
}


function changeColumn(taskId, columnId) {
    const task = taskList.find(task => task.id === taskId);  
    if (task) {
        task.column = columnId;
        generateTaskCards();
    }
}

// Daqui pra baixo foi retirado de https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API e modificado para se adequar
function dragstartHandler(ev) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("drag-data", ev.target.id);
    ev.dataTransfer.effectAllowed = "move";
  }

function dragoverHandler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  }

  function dropHandler(ev) {
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    const taskId = ev.dataTransfer.getData("drag-data");
    const columnElement = ev.target.closest('.board-column'); // Sobe até o elemento com a classe "board-column"
    const columnId = columnElement.dataset.columnId; 
    console.log(columnId);
    changeColumn(taskId, columnId);
}





