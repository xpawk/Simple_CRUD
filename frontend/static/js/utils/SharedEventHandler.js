export class SharedEventHandler {
    constructor(handlers, context) {
        this.handlers = handlers;
        this.context = context;
        this.preventsubmit();
        this.eventHandler();
    }

    preventsubmit() {
        document.addEventListener("submit", (e) => e.preventDefault());
    }

    eventHandler() {
        document.body.addEventListener("click", (e) => {
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
