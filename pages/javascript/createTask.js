document.addEventListener("DOMContentLoaded", function () {
    const $taskTitle = document.getElementById('title');
    const $taskDescription = document.getElementById('description');
    const $taskDeadline = document.getElementById('deadline');
    const $newTaskTitle = document.getElementById('newTaskTitle');
    const $editTaskTitle = document.getElementById('editTaskTitle');
    const $newTaskButton = document.getElementById('save-task');
    const $categoryId = document.getElementsByClassName('board-column');

    $newTaskButton.onclick = async function () {
        const title = $taskTitle.value.trim();
        const desc = $taskDescription.value.trim();
        const dueBy = $taskDeadline.value.trim();
        var progress = $categoryId;

        if (!title || !desc || !dueBy || !progress) {
            alert("Todos os campos são obrigatórios.");
            return;
        }

        progress = parseInt(progress);

        try {
            const response = await fetch("https://parseapi.back4app.com/classes/Task", {
                method: "POST",
                headers: {
                    "X-Parse-Application-Id": "nTNAn75SWRXgRMkgwDuPLXPmQNwnElUqeUSJbMwk",
                    "X-Parse-REST-API-Key": "kW7x86ZmUXka8yN5fLfZkKPmFiVaIW9rG1fllVWW",
                    "X-Parse-Session-Token": localStorage.getItem("sessionToken"),
                    "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Title: title,
                Description: desc,
                DueBy: {
                    "__type": "Date",
                    "iso": dueBy
                },
                Progress: progress,
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

        const data = await response.json();
        console.log("Tarefa criada com sucesso: ", data);

        } catch (error) {
            console.error("Ocorreu um erro na criação da tarefa: ", error);
            alert("Erro de conexão. Tente novamente.");
        }
    }
});
