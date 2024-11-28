document.addEventListener("DOMContentLoaded", function () {


    async function getListaTarefas() {
      const response = await fetch(tarefaURL, {
        method: "GET",
        headers: headers,
      });
      console.log("response", response);
      if (!response.ok) {
        alert("Erro ao acessar o back-end!");
        return;
      }
      const data = await response.json();
      console.log("data", data);
      return data.results;
    }
});