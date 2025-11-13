# ChatWave – Real-Time Chat App (PHP + Text File Backend)

> **A lightweight, real-time chat application** built with **HTML, CSS, JavaScript, and PHP** — **no database, no localStorage**.  
> Messages are stored in a **single `messages.txt` file** using **AJAX polling** for instant sync across tabs.

---

## Features

| Feature | Description |
|--------|-------------|
| **Real-Time Sync** | Messages appear instantly in all open tabs (AJAX polling every 1.5s) |
| **Animated UI** | Fade-in, slide-up, glassmorphism, gradient avatars |
| **Typing Indicator** | Bot shows `...` before replying |
| **Delete Messages** | Remove your own messages with a red × button |
| **Clear Chat** | One-click to wipe all messages |
| **Mini Chatbot** | Responds to `hello`, `help`, `bye`, `time` |
| **Responsive Design** | Works perfectly on mobile and desktop |
| **No Database** | Uses `messages.txt` with `time()` as unique ID |
| **Zero Setup** | Just drop files into `htdocs` and go |

---

## Live Demo

> **Run locally**:  
> → `http://localhost/chatwave`

> Open in **two browser tabs** → type a message → watch it appear instantly with smooth animations!

---

## Tech Stack

- **Frontend**: HTML5, CSS3 (Flexbox, Animations, Glassmorphism), Vanilla JavaScript
- **Backend**: PHP 7+ (File I/O, AJAX)
- **Storage**: Plain text file (`messages.txt`)
- **No dependencies** – pure, clean code

---

## Project Structure
chatwave/
├── index.html              → Main UI
├── style.css               → Glassmorphism + animations
├── script.js               → Real-time logic, bot, delete
├── send.php                → Append message with timestamp ID
├── get_messages.php        → Read all messages
├── delete_message.php      → Remove message by ID
├── clear_chat.php          → Empty chat
├── messages.txt            → Auto-generated storage
├── .gitignore              → Excludes messages.txt
└── README.md               → This file


---

## How to Run (XAMPP / Local Server)

1. **Install XAMPP** → [https://www.apachefriends.org](https://www.apachefriends.org)
2. Start **Apache**
3. Place the `chatwave` folder in:  
4. Open browser: http://localhost/chatwave

5. **Chat in multiple tabs** → see real-time magic!

---

## Bot Commands

| Type | Bot Replies |
|------|-------------|
| `hello` | "Hey! How can I help you today?" |
| `help`  | "Try: hello, time, bye..." |
| `bye`   | "Goodbye! Come back soon!" |
| `time`  | "It's 03:45 PM right now." |

---

## File Permissions (Important)

Ensure `messages.txt` is **writable** by PHP:

```bash
# In Git Bash (inside project folder)
touch messages.txt
chmod 666 messages.txt

git clone https://github.com/thisisahmad24/chatwave
cd chatwave
# Open in browser: http://localhost/chatwave

Future Ideas

 Add dark mode toggle
 Add emoji picker
 Add sound on send
 Upgrade to WebSocket (Ratchet PHP)
 Add user login & rooms


Author: Ahmad Hassan
Full-Stack Developer | PHP | JavaScript | UI/UX Enthusiast
GitHub: https://github.com/thisisahmad24
LinkedIn: https://www.linkedin.com/in/ahmad-hassan-84a43833a/

License
MIT License – Feel free to fork, modify, and use in your projects.

Made with passion and vanilla code
No frameworks. No bloat. Just pure web.