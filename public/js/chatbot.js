class Chatbot {
    constructor() {
        this.container = document.getElementById("chatbot-container");
        this.button = document.getElementById("chatbot-button");
        this.closeBtn = document.getElementById("chatbot-close");
        this.input = document.getElementById("chatbot-input");
        this.sendBtn = document.getElementById("chatbot-send");
        this.chatbox = document.getElementById("chatbot-box");
        this.isOpen = false;
        
        this.init();
    }

    init() {
        // Toggle chatbot
        this.button?.addEventListener("click", () => this.toggle());
        this.closeBtn?.addEventListener("click", () => this.close());
        
        // Send message
        this.sendBtn?.addEventListener("click", () => this.sendMessage());
        this.input?.addEventListener("keypress", (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
    }

    toggle() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.container.classList.add("active");
            this.input.focus();
        } else {
            this.container.classList.remove("active");
        }
    }

    close() {
        this.isOpen = false;
        this.container.classList.remove("active");
    }

    async sendMessage() {
        const message = this.input.value.trim();
        if (!message) return;

        // Disable input while sending
        this.input.disabled = true;
        this.sendBtn.disabled = true;

        // Add user message
        this.addMessage("You", message, "user");
        this.input.value = "";

        // Show typing indicator
        this.showTyping();

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) throw new Error("Network error");
            
            const data = await response.json();
            
            // Remove typing indicator
            this.hideTyping();
            
            // Add bot response
            this.addMessage("Bot", data.reply, "bot");
        } catch (error) {
            this.hideTyping();
            this.addMessage("Bot", "Sorry, I'm having trouble responding right now. Please try again later.", "bot");
            console.error("Chat error:", error);
        } finally {
            // Re-enable input
            this.input.disabled = false;
            this.sendBtn.disabled = false;
            this.input.focus();
        }
    }

    addMessage(sender, text, type) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `${type}-message`;
        messageDiv.innerHTML = `<strong>${sender}:</strong> ${this.escapeHtml(text)}`;
        
        this.chatbox.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTyping() {
        const typingDiv = document.createElement("div");
        typingDiv.className = "typing-indicator active";
        typingDiv.id = "typing-indicator";
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        this.chatbox.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTyping() {
        const typing = document.getElementById("typing-indicator");
        if (typing) typing.remove();
    }

    scrollToBottom() {
        this.chatbox.scrollTop = this.chatbox.scrollHeight;
    }

    escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    new Chatbot();
});