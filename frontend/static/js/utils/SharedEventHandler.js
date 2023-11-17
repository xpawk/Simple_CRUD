import router from "../routing.js";
export class SharedEventHandler {
    constructor() {
        this.context = {};
        this.globalHandlers = {
            // Global handlers
            modal_control_close: () => this.context?.modal.closeModal(),
            modal_control_bg: () => this.context?.modal.closeModal(),
        };
        this.pageHandlers = {};
        this.actionHandlers = [];
        this.preventsubmit();
        this.eventHandler();
    }

    registerGlobalHandlers(newHandlers, context) {
        this.context = context;
        Object.assign(this.globalHandlers, newHandlers);
        this.getHandlers();
        this.checkForActionHandlers();
    }

    registerPageHandlers(newHandlers, context) {
        this.context = context;
        this.pageHandlers = newHandlers;
        this.getHandlers();
        this.checkForActionHandlers();
    }

    clearPageHandlers() {
        this.pageHandlers = {};
        this.actionHandlers = [];
        this.getHandlers();
        this.checkForActionHandlers();
    }

    preventsubmit() {
        document.addEventListener("submit", (e) => e.preventDefault());
    }
    getHandlers() {
        this.handlers = { ...this.pageHandlers, ...this.globalHandlers };
    }
    checkForActionHandlers() {
        this.actionHandlers = [];
        for (const handlerInstance in this.handlers) {
            if (handlerInstance.includes("&")) {
                const [action, elementSelector] = handlerInstance.split("&");
                if (action === "outside") {
                    this.actionHandlers.push({
                        action: this.outsideAction,
                        elementSelector: elementSelector,
                        handler: this.handlers[handlerInstance],
                    });
                }
            }
        }
    }

    outsideAction(element, target, handler) {
        if (element && !element.contains(target)) {
            handler();
        }
    }

    handleNavigation = (e) => {
        const anchor = e.target.closest("a[route]");
        if (anchor) {
            e.preventDefault();
            if (anchor.classList.contains("go-back")) {
                window.history.go(-2);
            } else {
                const path = anchor.getAttribute("href");
                router(path);
            }
        }
    };

    eventHandler() {
        document.body.addEventListener("click", (e) => {
            this.handleNavigation(e);
            let target = e.target;
            this.actionHandlers.forEach(({ action, elementSelector, handler }) => {
                const element = document.querySelector(elementSelector);
                action(element, target, handler);
            });

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
