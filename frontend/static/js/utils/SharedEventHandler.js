export class SharedEventHandler {
    constructor() {
        this.globalHandlers = {
            // Global handlers
            modal_control_close: () => this.context?.modal.closeModal(),
            modal_control_bg: () => this.context?.modal.closeModal(),
        };
        this.pageHandlers = {};
        this.preventsubmit();
        this.eventHandler();
    }

    registerGlobalHandlers(newHandlers, context) {
        this.context = context;
        Object.assign(this.globalHandlers, newHandlers);
    }

    registerPageHandlers(newHandlers, context) {
        this.context = context;
        this.pageHandlers = newHandlers;
    }

    clearPageHandlers() {
        this.pageHandlers = {};
    }

    preventsubmit() {
        document.addEventListener("submit", (e) => e.preventDefault());
    }

    eventHandler() {
        document.body.addEventListener("click", (e) => {
            this.handlers = { ...this.pageHandlers, ...this.globalHandlers };
            let target = e.target;
            while (
                target != null &&
                !Array.from(target.classList).some((r) => this.handlers.hasOwnProperty(r))
            ) {
                target = target.parentElement;
            }
            if (target == null) return;
            const classList = target.classList;
            this.context.currentId = target.getAttribute("data-id");

            if (this.context.users instanceof Object) {
                this.context.currentUser = this.context.users.find(
                    (user) => user._id === this.context.currentId,
                );
            }
            for (const className in this.handlers) {
                if (classList.contains(className)) {
                    return this.handlers[className]();
                }
            }
        });
    }
}
