const chatBox = document.getElementById('chat-box');
const typingEl = document.getElementById('typing');
const form = document.getElementById('chat-form');
const usernameInp = document.getElementById('username');
const messageInp = document.getElementById('message');
const clearBtn = document.getElementById('clear-chat');

let lastMessages = [];

// Avatar from name
function getAvatar(name) {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#DDA0DD'];
  const initial = (name || '?').charAt(0).toUpperCase();
  const color = colors[name.charCodeAt(0) % colors.length];
  return `<div class="avatar" style="background:${color}">${initial}</div>`;
}

// Add message with animation
function addMessage(text, sender = 'sent', time = getTime(), id = null) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender}`;
  msgDiv.dataset.id = id;

  const avatar = getAvatar(sender === 'sent' ? usernameInp.value : 'Bot');
  const deleteBtn = sender === 'sent' ? `<button class="delete-btn" onclick="deleteMessage(${id})">×</button>` : '';

  msgDiv.innerHTML = `
    ${sender === 'received' ? avatar : ''}
    <div class="content">
      ${text}
      <div class="time">${time}</div>
    </div>
    ${sender === 'sent' ? deleteBtn : ''}
    ${sender === 'sent' ? avatar : ''}
  `;

  chatBox.appendChild(msgDiv);
  scrollToBottom();
}

// Smooth scroll
function scrollToBottom() {
  chatBox.scrollTop = chatBox.scrollHeight;
}

function getTime() {
  return new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
}

// Bot
const botResponses = {
  hello: "Hey! How can I help you today?",
  help : "Try: *hello*, *time*, *bye*, or just chat!",
  bye  : "Goodbye! Come back soon!",
  time : `It's ${getTime()} right now.`
};

function getBotReply(msg) {
  const low = msg.toLowerCase().trim();
  for (const [key, reply] of Object.entries(botResponses)) {
    if (low.includes(key)) return reply;
  }
  return null;
}

// Send
form.addEventListener('submit', async e => {
  e.preventDefault();
  const username = usernameInp.value.trim() || 'You';
  const msg = messageInp.value.trim();
  if (!msg) return;

  const res = await fetch('send.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `username=${encodeURIComponent(username)}&message=${encodeURIComponent(msg)}`
  });

  const data = await res.json();
  if (data.id) {
    addMessage(msg, 'sent', getTime(), data.id);
  }

  messageInp.value = '';

  const botReply = getBotReply(msg);
  if (botReply) {
    typingEl.style.display = 'block';
    setTimeout(() => {
      typingEl.style.display = 'none';
      addMessage(botReply, 'received');
    }, 800 + Math.random() * 700);
  }
});

// Poll
async function loadMessages() {
  const res = await fetch('get_messages.php');
  const messages = await res.json();

  if (JSON.stringify(messages) === JSON.stringify(lastMessages)) return;

  chatBox.innerHTML = '';
  messages.forEach(m => {
    const sender = m.username === (usernameInp.value.trim() || 'You') ? 'sent' : 'received';
    addMessage(m.message, sender, m.time, m.id);
  });

  lastMessages = messages;
}
setInterval(loadMessages, 1500);
loadMessages();

// Clear chat
clearBtn.addEventListener('click', async () => {
  if (!confirm('Clear all messages?')) return;
  await fetch('clear_chat.php');
  chatBox.innerHTML = '';
  lastMessages = [];
});

// Delete message
async function deleteMessage(id) {
  await fetch('delete_message.php', {
    method: 'POST',
    body: `id=${id}`
  });
  loadMessages();
}