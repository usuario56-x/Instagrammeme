const loginContainer = document.getElementById('login-container');
const chatContainer = document.getElementById('chat-container');
const usernameInput = document.getElementById('username-input');
const loginButton = document.getElementById('login-button');
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const roomButtons = document.querySelectorAll('.room-button');

let username = '';
let currentRoom = '';
let rooms = {
    sala1: [],
    sala2: [],
    sala3: [],
    sala4: [],
    sala5: []
};

function displayMessages() {
    if (!currentRoom) return;
    messagesDiv.innerHTML = rooms[currentRoom].map(msg => {
        const messageClass = msg.username === username ? 'sent' : 'received';
        return `<p class="${messageClass}"><strong>${msg.username}:</strong> ${msg.text}</p>`;
    }).join('');
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function addMessage(text) {
    if (!currentRoom) return;
    rooms[currentRoom].push({ username, text });
    localStorage.setItem('chatRooms', JSON.stringify(rooms));
    displayMessages();
}

loginButton.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (username) {
        loginContainer.style.display = 'none';
        chatContainer.style.display = 'block';
    } else {
        alert('Por favor, insira um nome de usuário.');
    }
});

roomButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentRoom = button.dataset.room;
        displayMessages();
    });
});

sendButton.addEventListener('click', () => {
    const text = messageInput.value.trim();
    if (text) {
        addMessage(text);
        messageInput.value = '';
    }
});

// Carrega salas salvas
rooms = JSON.parse(localStorage.getItem('chatRooms')) || rooms;
