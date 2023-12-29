export default class Modal {
    constructor() {
        document.querySelector("main").innerHTML += ` 
        <div class="modal_control">
        <div class="modal_control_bg "></div>
        <div class="modal_content">
          <h2>Success</h2>
          <p></p>
          <button tabindex="1" class="modal_control_close">Continue</button>
        </div>
        </div>
        `;
    }
    createModal(header, text) {
        this.modal = document.querySelector(".modal_control");
        this.modalContent = this.modal.querySelector(".modal_content");
        this.modalButton = this.modal.querySelector(".modal_control_close");
        this.modal.classList.add("open");
        this.modalButton.focus();
        document.body.style.overflow = "hidden";
        this.modalContent.querySelector("p").textContent = text;
        this.modalContent.querySelector("h2").textContent = header;
    }
    closeModal() {
        document.body.style.overflow = "";
        this.modal.classList.remove("open");
    }
    destroy() {
        if (this.modal && this.modal.parentNode) {
            this.modal.parentNode.removeChild(this.modal);
        }
    }
}
