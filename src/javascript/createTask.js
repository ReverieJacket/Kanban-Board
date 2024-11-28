document.addEventListener("DOMContentLoaded", function () {
    const btAddTask = document.getElementById("testButton");
    const taskTitle = document.getElementById("taskTitle");
    const taskDesc = document.getElementById("taskDesc");
    const taskDueBy = document.getElementById("taskDueBy");
    var taskProgress = document.getElementById("taskProgress");

    btAddTask.onclick = async function () {
        const title = taskTitle.value.trim();
        const description = taskDesc.value.trim();
        const dueBy = taskDueBy.value.trim();
        var progress = taskProgress.value.trim();

        if (!title || !description || !dueBy || !progress) {
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
                    "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Title: title,
                Description: description,
                DueBy: {
                    "__type": "Date",
                    "iso": dueBy
                },
                Progress: progress,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("Erro no login: ", error);
            alert("Erro ao fazer o login: " + error.error);
            return;
        }

        const data = await response.json();
        console.log("Tarefa criada com sucesso: ", data);

        } catch (error) {
            console.error("Ocorreu um erro: ", error);
            alert("Erro de conexão. Tente novamente.");
        }
    }
});
