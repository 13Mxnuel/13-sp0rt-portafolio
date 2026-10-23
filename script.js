const filterButtons = document.querySelectorAll(".filter");
const productCards = document.querySelectorAll(".product-card");
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter.trim();
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    productCards.forEach((card) => {
      card.hidden = selectedCategory !== "todos" && card.dataset.category !== selectedCategory;
    });
  });
});

const dialog = document.getElementById("product-dialog");
const dialogTitle = document.getElementById("dialog-title");
const dialogDescription = document.getElementById("dialog-description");
const dialogWhatsapp = document.getElementById("dialog-whatsapp");
document.querySelectorAll(".product-open").forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.name || "Diseño 13 Sports";
    dialogTitle.textContent = name;
    dialogDescription.textContent = button.dataset.desc || "Diseño conceptual de 13 Sports.";
    dialogWhatsapp.href = "https://wa.me/18494684483?text=" + encodeURIComponent("Hola, 13 Sports. Quiero información sobre el diseño " + name + ".");
    if (typeof dialog.showModal === "function") dialog.showModal();
  });
});
document.getElementById("dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });

const panel = document.getElementById("assistant-panel");
document.getElementById("open-assistant").addEventListener("click", () => {
  panel.hidden = false;
  document.getElementById("chat-input").focus();
});
document.getElementById("close-assistant").addEventListener("click", () => { panel.hidden = true; });

const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");
function addMessage(text, className) {
  const message = document.createElement("p");
  message.className = className;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
function answerQuestion(question) {
  const q = question.toLowerCase();
  if (q.includes("basket") || q.includes("baloncesto")) return "En Basketball tenemos Court Vision: un jersey de manga corta con el número 13.";
  if (q.includes("fútbol") || q.includes("futbol") || q.includes("messi") || q.includes("argentina")) return "Mira Celeste 13, una camiseta original inspirada en los colores celeste y blanco clásicos de Argentina.";
  if (q.includes("voleibol") || q.includes("volleyball")) return "Rise Up es nuestra propuesta de jersey de voleibol de manga corta.";
  if (q.includes("t-shirt") || q.includes("camiseta") || q.includes("compresión") || q.includes("compresion")) return "En T-Shirt hay dos conceptos de compresión: Compression Core y Blackout Performance.";
  if (q.includes("precio") || q.includes("comprar") || q.includes("pedido") || q.includes("disponible")) return "Los modelos son diseños de muestra; precio, disponibilidad y fabricación se deben confirmar por WhatsApp al 849-468-4483.";
  if (q.includes("whatsapp") || q.includes("contacto") || q.includes("teléfono") || q.includes("telefono")) return "Puedes escribir al WhatsApp 849-468-4483 desde el botón de contacto.";
  if (q.includes("catálogo") || q.includes("catalogo") || q.includes("producto") || q.includes("diseño")) return "El catálogo tiene Basketball, Fútbol, Voleibol y T-Shirt. Usa los botones para filtrar y toca un diseño para ver sus detalles.";
  if (q.includes("slogan") || q.includes("frase") || q.includes("lema")) return "Nuestro lema es: “Haz que mañana supere tu ayer”.";
  return "Puedo orientarte sobre las categorías, los diseños y el contacto. Prueba preguntando por basketball, fútbol, voleibol, T-Shirt o WhatsApp.";
}
chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = chatInput.value.trim();
  if (!question) return;
  addMessage(question, "user-message");
  addMessage(answerQuestion(question), "bot-message");
  chatInput.value = "";
  chatInput.focus();
});