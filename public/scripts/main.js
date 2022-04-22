import Modal from "./modal.js";

const modal = Modal();

const modalTitle = document.querySelector(".modal h2");
const modalDescription = document.querySelector(".modal p");
const modalButton = document.querySelector(".modal button");

/** Função para "Marcar como lido" */
const checkButtons = document.querySelectorAll(".actions a.check");
checkButtons.forEach((button) => {
  button.addEventListener("click", handleClick);
});

/** Função para "Excluir" */
const deleteButton = document.querySelectorAll(".actions a.delete");
deleteButton.forEach((button) => {
  button.addEventListener("click", (event) => handleClick(event, false));
});

function handleClick(event, check = true) {
  event.preventDefault();
  const text = check ? "Marcar como lida" : "Excluir";

  /** Pegar ação */
  const slug = check ? "check" : "delete"

  /** Pegar id da sala */
  const roomId = document.querySelector("#room-id").dataset.id

  /** Pegar id da questão */
  const questionId = event.target.dataset.id

  /** Montar os dados do formulário */
  const form = document.querySelector(".modal form")
  form.setAttribute("action", `/room/${roomId}/${questionId}/${slug}`)

  modalTitle.innerHTML = `${text} esta pergunta`;
  modalDescription.innerHTML = `Tem certeza que deseja ${text.toLowerCase()} esta pergunta?`;
  modalButton.innerHTML = `Sim, ${text.toLowerCase()}`;
  check
    ? modalButton.classList.remove("red")
    : modalButton.classList.add("red");

  //abrir modal
  modal.open();
}
