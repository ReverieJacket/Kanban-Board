/*// Script para integração com Google Agenda e Back4App

// Função para carregar o cliente da API Google
function loadGoogleClient() {
    gapi.load('client:auth2', initGoogleClient);
}

// Inicializa o cliente Google API
function initGoogleClient() {
    gapi.client.init({
        apiKey: 'YOUR_GOOGLE_API_KEY', // Substitua com sua chave de API do Google
        clientId: 'YOUR_GOOGLE_CLIENT_ID', // Substitua com seu ID de cliente OAuth
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: "https://www.googleapis.com/auth/calendar"
    }).then(() => {
        // Verifica se o usuário está autenticado
        const GoogleAuth = gapi.auth2.getAuthInstance();
        if (GoogleAuth.isSignedIn.get()) {
            listUpcomingEvents();
        } else {
            GoogleAuth.signIn().then(listUpcomingEvents);
        }
    });
}

// Função para listar os eventos futuros do Google Agenda
function listUpcomingEvents() {
    gapi.client.calendar.events.list({
        'calendarId': 'primary', // Use o ID da agenda
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
    }).then((response) => {
        const events = response.result.items;
        if (events.length > 0) {
            console.log('Eventos próximos:');
            events.forEach(event => {
                console.log(event.summary, event.start.dateTime || event.start.date);
                syncWithBack4App(event);
            });
        } else {
            console.log('Nenhum evento futuro encontrado.');
        }
    });
}

// Função para sincronizar eventos com o Back4App
function syncWithBack4App(event) {
    const eventData = {
        title: event.summary,
        start: event.start.dateTime || event.start.date,
        end: event.end.dateTime || event.end.date,
        description: event.description || '',
    };

    // Salvar no Back4App via API REST
    fetch('https://parseapi.back4app.com/classes/Event', {
        method: 'POST',
        headers: {
            'X-Parse-Application-Id': 'X-Parse-Application-Id": "nTNAn75SWRXgRMkgwDuPLXPmQNwnElUqeUSJbMwk', // ID do Back4App 
            'X-Parse-REST-API-Key': 'X-Parse-REST-API-Key": "kW7x86ZmUXka8yN5fLfZkKPmFiVaIW9rG1fllVWW', // chave de API do Back4App
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Evento sincronizado com Back4App:', data);
    })
    .catch(error => {
        console.error('Erro ao sincronizar com Back4App:', error);
    });
}

// Função para criar um evento no Google Agenda
function createEvent() {
    const event = {
        'summary': 'Evento Teste',
        'location': 'Local Teste',
        'description': 'Descrição do evento.',
        'start': {
            'dateTime': '2024-12-10T09:00:00-07:00',
            'timeZone': 'America/Los_Angeles',
        },
        'end': {
            'dateTime': '2024-12-10T10:00:00-07:00',
            'timeZone': 'America/Los_Angeles',
        },
        'attendees': [
            {'email': 'attendee1@example.com'},
        ],
        'reminders': {
            'useDefault': true,
        },
    };

    const request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event
    });

    request.execute(function(event) {
        console.log('Evento criado: ' + event.htmlLink);
        // Após criar o evento no Google Agenda, salvar no Back4App
        syncWithBack4App(event);
    });
}

// Função de logout da conta Google
function signOut() {
    const GoogleAuth = gapi.auth2.getAuthInstance();
    GoogleAuth.signOut().then(function() {
        console.log('Usuário desconectado do Google');
    });
}
*/
