// document.getElementById("chatbot-button").addEventListener("click", function () {
//   var chatbot = document.getElementById("chatbot-container");
//   chatbot.style.display = (chatbot.style.display === "none" || chatbot.style.display === "") ? "block" : "none";
// });

// async function sendMessage() {
//   const input = document.getElementById("chatbot-input");
//   const chatbox = document.getElementById("chatbot-box");
//   if (!input.value.trim()) return;

//   chatbox.innerHTML += `<p><strong>You:</strong> ${input.value}</p>`;

//   try {
//       const response = await fetch("/listings/chat", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ message: input.value }),
//       });

//       const data = await response.json();
//       chatbox.innerHTML += `<p><strong>Bot:</strong> ${data.reply || "Error"}</p>`;
//   } catch (error) {
//       chatbox.innerHTML += `<p><strong>Bot:</strong> Error processing request</p>`;
//   }

//   input.value = "";
//   chatbox.scrollTop = chatbox.scrollHeight;
// }
