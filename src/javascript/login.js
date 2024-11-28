document.addEventListener("DOMContentLoaded", function () {
    const btLogin = document.getElementById("btLogin");
    const userLogin = document.getElementById("userLogin");
    const passwordLogin = document.getElementById("passwordLogin");

    btLogin.onclick = async function () {
        const username = userLogin.value.trim();
        const password = passwordLogin.value.trim();

        if (!username || !password) {
            alert("Todos os campos são obrigatórios.");
            return;
        }

        try {
            const response = await fetch("https://parseapi.back4app.com/login", {
                method: "POST",
                headers: {
                    'X-Parse-Application-Id': 'nTNAn75SWRXgRMkgwDuPLXPmQNwnElUqeUSJbMwk',
                    'X-Parse-REST-API-Key': 'kW7x86ZmUXka8yN5fLfZkKPmFiVaIW9rG1fllVWW',
                    'X-Parse-Revocable-Session': '1',
                    "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Erro no login:', error);
            alert("Erro ao fazer o login: " + error.error);
            return;
        }

        const userData = await response.json();
        console.log('Login feito com sucesso:', userData);

        localStorage.setItem("userId", userData.objectId);
        localStorage.setItem("sessionToken", userData.sessionToken);
        } catch (error) {
            console.error('An error occurred:', error);
            alert("Erro de conexão. Tente novamente.");
        }
    }
});
