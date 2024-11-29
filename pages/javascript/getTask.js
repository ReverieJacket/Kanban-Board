document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById('fetch');

    button.onclick = async function () {
        const response = await fetch("https://parseapi.back4app.com/classes/Task", {
            method: "GET",
            headers: {
                "X-Parse-Application-Id": "nTNAn75SWRXgRMkgwDuPLXPmQNwnElUqeUSJbMwk",
                "X-Parse-REST-API-Key": "kW7x86ZmUXka8yN5fLfZkKPmFiVaIW9rG1fllVWW",
            }
        });

        const data = await response.json();
    }
});