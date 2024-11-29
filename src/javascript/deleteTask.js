document.addEventListener("DOMContentLoaded", function () {
    const btDelTask = document.getElementById("btDelTask");
    //Como selecionar a tarefa para deletar?

    btDelTask.onclick = async function () {
        const taskId = "QKdlBlgnYA";

        /*if (!title) {
            alert("Selecione uma tarefa para deletar.");
            return;
        }*/

        try {
            const response = await fetch(`https://parseapi.back4app.com/classes/Task/${taskId}`, {
                method: "DELETE",
                headers: {
                    "X-Parse-Application-Id": "nTNAn75SWRXgRMkgwDuPLXPmQNwnElUqeUSJbMwk",
                    "X-Parse-REST-API-Key": "kW7x86ZmUXka8yN5fLfZkKPmFiVaIW9rG1fllVWW",
                    "X-Parse-Session-Token": localStorage.getItem("sessionToken"),
                    "Content-Type": "application/json",
            },
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
    }
});
