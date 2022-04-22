export default function Modal() {

  const modalWrapper = document.querySelector('.modal-wrapper')
  /** Pegar botão de cancelar */
  const cancelButton = document.querySelector('.button.cancel')
  /** Vincular função de fechar modal */
  cancelButton.addEventListener("click", close)
  
  function open() {
    modalWrapper.classList.add('active')
  }

  function close() {
    modalWrapper.classList.remove('active')
  }

  return { open, close }  

}