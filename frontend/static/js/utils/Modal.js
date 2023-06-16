export default class Modal {
    constructor() {
        document.querySelector('#app').innerHTML += ` 
        <div class="modal_control">
        <div class="modal_control_bg "></div>
        <div class="modal_content">
          <h2>Success</h2>
          <p></p>
          <button class="modal_control_close">Continue</button>
        </div>
        </div>
        `;
    }
    createModal(header, text) {
        this.modal = document.querySelector('.modal_control');
        this.modal.classList.add('open');
        const modalContent = this.modal.querySelector('.modal_content');
        document.body.style.overflow = 'hidden';
        modalContent.querySelector('p').textContent = text;
        modalContent.querySelector('h2').textContent = header;
    }
    closeModal() {
        document.body.style.overflow = '';
        this.modal.classList.remove('open');
    }
}
