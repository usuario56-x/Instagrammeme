const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];

function displayMessages() {
    messagesDiv.innerHTML = '';
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.textContent = message;
        messagesDiv.appendChild(messageElement);
    });
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        messages.push(message);
        localStorage.setItem('chatMessages', JSON.stringify(messages));
        messageInput.value = '';
        displayMessages();
    }
}

displayMessages();

sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

messageInput.addEventListener('input', function() {
    if (messageInput.value.trim()) {
        const typingMessage = document.createElement('div');
        typingMessage.classList.add('typing');
        typingMessage.textContent = 'Alguém está digitando...';
        messagesDiv.appendChild(typingMessage);
    } else {
        const typingMessage = messagesDiv.querySelector('.typing');
        if (typingMessage) {
            typingMessage.remove();
        }
    }
});
