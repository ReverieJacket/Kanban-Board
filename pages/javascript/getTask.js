document.addEventListener("DOMContentLoaded", function () {
    const url = "https://parseapi.back4app.com/classes/Task";
    const headers = {
      "X-Parse-Application-Id": "nTNAn75SWRXgRMkgwDuPLXPmQNwnElUqeUSJbMwk",
      "X-Parse-REST-API-Key": "kW7x86ZmUXka8yN5fLfZkKPmFiVaIW9rG1fllVWW",
      "Content-Type": "application/json",
    };

    fetch(url, { headers })
        .then((response) => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
        return response.json();
    })
    .then((data) => {
        console.log("Response data:", data);
    })
    .catch((error) => {
        console.error("Error fetching tasks:", error);
    });
});