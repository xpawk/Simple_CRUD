export default class Loader {
    constructor() {
        document.querySelector('#app').innerHTML += `    
        <div class="loader">
        <div class="loader_content"></div>
        <div class="loader_bg"></div>
        </div>`;
        this.loader = document.querySelector('.loader');
    }

    show() {
        this.loader.style.display = 'block';
    }

    hide() {
        this.loader.style.display = 'none';
    }

    async withLoader(operation) {
        try {
            this.show();
            return await operation();
        } finally {
            this.hide();
        }
    }
}
