const inputTitle = document.getElementById("inputTitle");
const inputDesc = document.getElementById("inputDesc");
const inputDate = document.getElementById("inputDate");
const btAdd = document.getElementById("testButton");
const tarefaURL = "https://parseapi.back4app.com/classes/Task";

const headers = {
    "X-Parse-Application-Id":"nTNAn75SWRXgRMkgwDuPLXPmQNwnElUqeUSJbMwk",
    "X-Parse-REST-API-Key":"kW7x86ZmUXka8yN5fLfZkKPmFiVaIW9rG1fllVWW",
};

window.onload = handleWindowLoad;
btAdd.onclick = createTask;

async function createTask(Task) {
    try {
        const response = await fetch(tarefaURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            headers,
            Authorization: "Bearer SEU_TOKEN_AQUI", // Adicione o token se necessário
          },
          body: JSON.stringify(tarefa),
        });

        if (!response.ok) {
          const error = await response.json();
          console.error("Erro na API:", error);
          alert("Erro ao criar tarefa: " + (error.message || "Verifique os dados."));
          return false;
        }

        // Tarefa criada com sucesso
        return true;
      } catch (error) {
        console.error("Erro de conexão com a API:", error);
        alert("Erro de conexão. Tente novamente mais tarde.");
        return false;
      }
}




const headersJson = {
    ...headers,
    "Content-Type":"application/Json",
};



fetch(, {
  method: 'POST',
  headers: {
    '': '',
    '': '',
    'Content-Type': 'application/json'
  },
  // body: '{ "Title":"A string","Description":"A string","DueBy":{ "__type": "Date", "iso": "2018-11-06T18:02:52.249Z" },"Progress":1,"User":{ "__type": "Pointer", "className": "_User", "objectId": "<THE_REFERENCED_OBJECT_ID>" } }',
  body: JSON.stringify({
    'Title': 'A string',
    'Description': 'A string',
    'DueBy': {
      '__type': 'Date',
      'iso': '2018-11-06T18:02:52.249Z'
    },
    'Progress': 1,
    'User': {
      '__type': 'Pointer',
      'className': '_User',
      'objectId': '<THE_REFERENCED_OBJECT_ID>'
    }
  })
});