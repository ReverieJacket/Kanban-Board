document.addEventListener("DOMContentLoaded", function () {
    const btLogout = document.getElementById("btLogout");

    btLogout.onclick = async function () {
        try {
            const response = await fetch("https://parseapi.back4app.com/logout", {
                method: "POST",
                headers: {
                    "X-Parse-Application-Id": "nTNAn75SWRXgRMkgwDuPLXPmQNwnElUqeUSJbMwk",
                    "X-Parse-REST-API-Key": "kW7x86ZmUXka8yN5fLfZkKPmFiVaIW9rG1fllVWW",
                    "X-Parse-Session-Token": localStorage.getItem("sessionToken"),
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const error = await response.json();
                console.error("Erro no logout: ", error);
                alert("Erro ao sair: " + error.error);
                return;
            }

            console.log("Logout com sucesso!");

            localStorage.removeItem("userId");
            localStorage.removeItem("sessionToken");
        } catch (error) {
            console.error("Erro de conexão ao deslogar usuário: ", error);
            alert("Erro de conexão. Tente novamente.");
        }
    };
});
