document.addEventListener("DOMContentLoaded", function () {
    const btSignUp = document.getElementById("btSignup");
    const userSignup = document.getElementById("username");
    const emailSignup = document.getElementById("email");
    const passwordSignup = document.getElementById("password");

    function handleLogin() {
        window.location.href = "./login.html";
    }

    btSignUp.onclick = async function () {
        const username = userSignup.value.trim();
        const email = emailSignup.value.trim();
        const password = passwordSignup.value.trim();

        if (!username || !email || !password) {
            alert("Todos os campos são obrigatórios.");
            return;
        }

        try {
            const response = await fetch("https://parseapi.back4app.com/users", {
                method: "POST",
                headers: {
                    "X-Parse-Application-Id": "nTNAn75SWRXgRMkgwDuPLXPmQNwnElUqeUSJbMwk",
                    "X-Parse-REST-API-Key": "kW7x86ZmUXka8yN5fLfZkKPmFiVaIW9rG1fllVWW",
                    "X-Parse-Revocable-Session": "1",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                console.error("Erro no cadastro:", error);
                alert("Erro ao criar conta: " + error.error);
                return;
            }

            const userData = await response.json();
            console.log("Usuário criado com sucesso:", userData);

            localStorage.setItem("userId", userData.objectId);
            localStorage.setItem("sessionToken", userData.sessionToken);
            window.location.href = "./index.html";
        } catch (error) {
            console.error("Ocorreu um erro no cadastro: ", error);
            alert("Erro de conexão. Tente novamente.");
        }
    };
});
