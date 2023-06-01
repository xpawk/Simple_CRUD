export default class Loader {
    constructor(el) {
        this.loader = el;
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
