async function loginUsuario(username, password) {
    try {
        const response = await fetch("https://parseapi.back4app.com/login", {
            method: "POST", // Changed to POST
            headers: {
                "X-Parse-Application-Id": "TNAn75SWRXgRMkgwDuPLXPmQNwnElUqeUSJbMwk",
                "X-Parse-REST-API-Key": "kW7x86ZmUXka8yN5fLfZkKPmFiVaIW9rG1fllVWW",
                "X-Parse-Revocable-Session": "1",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }), // Correctly include data in the body
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("Erro no login:", error);
            alert("Erro ao autenticar usuário: " + error.error);
            return null;
        }

        const userData = await response.json();
        // Save user data locally
        localStorage.setItem("userId", userData.objectId);
        localStorage.setItem("sessionToken", userData.sessionToken);
        console.log(userData);

        alert("Login realizado com sucesso!");
        return userData;
    } catch (error) {
        console.error("Erro de conexão ao autenticar:", error);
        alert("Erro de conexão. Tente novamente.");
        return null;
    }
}
