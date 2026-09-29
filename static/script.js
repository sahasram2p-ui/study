const form = document.getElementById("chatForm");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("messages");
const welcome = document.getElementById("welcome");
const newChatBtn = document.getElementById("newChatBtn");
const clearBtn = document.getElementById("clearBtn");
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function addMessage(text, role) {
    welcome.style.display = "none";

    const row = document.createElement("div");
    row.className = `message ${role === "user" ? "user" : "bot"}`;

    if (role === "bot") {
        row.innerHTML = `
            <div class="avatar">SP</div>
            <div class="bubble">${escapeHtml(text)}</div>
        `;
    } else {
        row.innerHTML = `<div class="bubble">${escapeHtml(text)}</div>`;
    }

    messages.appendChild(row);
    scrollToBottom();
}

function addTyping() {
    const row = document.createElement("div");
    row.className = "message bot";
    row.id = "typingRow";
    row.innerHTML = `
        <div class="avatar">SP</div>
        <div class="bubble">
            <div class="typing"><i></i><i></i><i></i></div>
        </div>
    `;
    messages.appendChild(row);
    scrollToBottom();
}

function removeTyping() {
    document.getElementById("typingRow")?.remove();
}

function scrollToBottom() {
    const area = document.getElementById("chatArea");
    requestAnimationFrame(() => area.scrollTop = area.scrollHeight);
}

function resizeInput() {
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 130) + "px";
}

async function sendMessage(message) {
    message = message.trim();
    if (!message || sendBtn.disabled) return;

    addMessage(message, "user");
    input.value = "";
    resizeInput();
    sendBtn.disabled = true;
    addTyping();

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        removeTyping();

        if (data.success) {
            addMessage(data.reply, "bot");
        } else {
            addMessage(data.error || "Something went wrong. Please try again.", "bot");
        }
    } catch (error) {
        removeTyping();
        addMessage("Unable to connect to StudyPilot right now. Please check that the Flask server is running.", "bot");
    } finally {
        sendBtn.disabled = false;
        input.focus();
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    sendMessage(input.value);
});

input.addEventListener("input", resizeInput);
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        form.requestSubmit();
    }
});

document.querySelectorAll("[data-question]").forEach(btn => {
    btn.addEventListener("click", () => sendMessage(btn.dataset.question));
});

function clearChat() {
    messages.innerHTML = "";
    welcome.style.display = "";
    input.value = "";
    resizeInput();
    input.focus();
}

newChatBtn.addEventListener("click", () => {
    clearChat();
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
});

clearBtn.addEventListener("click", clearChat);

menuBtn.addEventListener("click", () => {
    sidebar.classList.add("open");
    overlay.classList.add("show");
});

overlay.addEventListener("click", () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
});
