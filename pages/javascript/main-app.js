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

const url = "https://parseapi.back4app.com/classes/Task";
const headers = {
    "X-Parse-Application-Id": "nTNAn75SWRXgRMkgwDuPLXPmQNwnElUqeUSJbMwk",
    "X-Parse-REST-API-Key": "kW7x86ZmUXka8yN5fLfZkKPmFiVaIW9rG1fllVWW",
    "X-Parse-Session-Token": localStorage.getItem("sessionToken"),
    "Content-Type": "application/json",
};

getTasks();
generateTaskCards();


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
        const date = new Date(task.deadline.iso);
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

async function getTasks() {
    const response = await fetch(url, {
        method: "GET",
        headers: headers,
    });
    if (!response.ok) {
        const error = await response.json();
        console.error("Erro no login: ", error);
        alert("Erro ao fazer o login: " + error.error);
        return;
    }
    const data = await response.json();
    const filter = data.results.map(task => ({
        id: task.objectId,
        title: task.Title,
        description: task.Description,
        deadline: task.DueBy,
        column: task.Progress
    }))
    filter.forEach(task => taskList.push(task));
    sessionStorage.setItem("taskItems", JSON.stringify(filter));
    generateTaskCards();
}

async function createTaskCard() {
    const title = $taskTitle.value;
    const errorMessage = document.getElementById('error-message');
    var data;
    
    if (!title || !deadline) {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Título e prazo são obrigatórios!";
        return; 
    }

    errorMessage.style.display = "none";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                Title: $taskTitle.value.trim(),
                Description: $taskDescription.value.trim(),
                DueBy: {
                    "__type": "Date",
                    "iso": $taskDeadline.value.trim()
                },
                Progress: parseInt($categoryId.value),
                "Owner": {
                    "__type": "Pointer",
                    "className": "_User",
                    "objectId": localStorage.getItem("userId")
                    }
                }),
            });

        if (!response.ok) {
            const error = await response.json();
            console.error("Erro ao criar a tarefa: ", error);
            alert("Erro ao criar a tarefa: " + error.error);
            return;
        }

        data = await response.json();
        console.log("Tarefa criada com sucesso: ", data);
    } catch (error) {
        console.error("Ocorreu um erro na criação da tarefa: ", error);
        alert("Erro de conexão. Tente novamente.");
    }

    const newTask = {
        id: data.objectId,
        title,
        description: $taskDescription.value,
        deadline: data.DueBy,
        column: $categoryId.value
    };

    taskList.push(newTask);
    sessionStorage.setItem("taskItems", JSON.stringify(taskList));
    closeTaskCreator();
    generateTaskCards();
}

async function updateTaskCard() {
    const task = taskList.find(task => task.id === $taskId.value);
    if (task) {
        task.title = $taskTitle.value;
        task.description = $taskDescription.value;
        task.deadline.iso = $taskDeadline.value;
        task.column = $categoryId.value;
    }
    sessionStorage.setItem("taskItems", JSON.stringify(taskList));

    try {
        const response = await fetch(`${url}/${task.id}`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify({
                Title: task.title.trim(),
                Description: task.description.trim(),
                DueBy: {
                    "__type": "Date",
                    "iso": task.deadline.iso.trim()
                },
                Progress: parseInt(task.column),
            }),
        });

            if (!response.ok) {
                const error = await response.json();
                console.error("Erro ao criar a tarefa: ", error);
                alert("Erro ao criar a tarefa: " + error.error);
                return;
            }

            data = await response.json();
            console.log("Tarefa atualizada com sucesso: ", data);
        } catch (error) {
            console.error("Ocorreu um erro na atualização da tarefa: ", error);
            alert("Erro de conexão. Tente novamente.");
        }

    closeTaskCreator();
    generateTaskCards();
}


async function removeTaskCard(taskId) {
    taskList.splice(taskList.findIndex(task => task.id === taskId), 1);
    try {
        const response = await fetch(`https://parseapi.back4app.com/classes/Task/${taskId}`, {
        method: "DELETE",
        headers: headers,
    });

    if (!response.ok) {
        const error = await response.json();
        console.error("Erro ao deletar a tarefa: ", error);
        alert("Erro ao deletar a tarefa: " + error.error);
        return;
    }

    const data = await response.json();
    console.log("Tarefa deletada com sucesso: ", data);

    } catch (error) {
        console.error("Ocorreu um erro na deleção da tarefa: ", error);
        alert("Erro de conexão. Tente novamente.");
    }
    sessionStorage.setItem("taskItems", JSON.stringify(taskList));
    generateTaskCards();
}


function changeColumn(taskId, columnId) {
    const task = taskList.find(task => task.id === taskId);  
    if (task) {
        task.column = columnId;
        sessionStorage.setItem("taskItems", JSON.stringify(taskList));
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





