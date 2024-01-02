import AdminPanelEvents from "./subPages/adminPanel/AdminPanelEvents.js";
import AdminPanel from "./subPages/adminPanel/adminPanel.js";
import Home from "./subPages/home.js";
import LoginPage from "./subPages/login/loginPage.js";
import LoginEvents from "./subPages/login/loginEvents.js";
import PasswordReset from "./subPages/passwordReset.js";
import Register from "./subPages/register.js";
import PasswordChange from "./subPages/account/passwordChange/passwordChange.js";
import PasswordChangeEvents from "./subPages/account/passwordChange/passwordChangeEvents.js";
import ErrorPage from "./subPages/errorPage.js";
import AccountPage from "./subPages/account/accountPage.js";
import Header from "./components/Header.js";
import { ApiOperations } from "./apiOperations.js";
import { SharedEventHandler } from "./utils/SharedEventHandler.js";
import AccountPageEvents from "./subPages/account/accountPageEvents.js";

const routes = [
    {
        view: AdminPanel,
        path: "/adminPanel",
        additionalClasses: [AdminPanelEvents],
        protected: true,
        allowedRoles: ["Admin"],
    },
    {
        view: ErrorPage,
        path: "/error-page",
        additionalClasses: [],
        protected: false,
    },
    { view: Home, path: "/", additionalClasses: [], protected: false },
    {
        view: LoginPage,
        path: "/login",
        additionalClasses: [LoginEvents],
        protected: false,
    },
    {
        view: PasswordReset,
        path: "/password-reset",
        additionalClasses: [],
        protected: false,
    },
    {
        view: Register,
        path: "/register",
        additionalClasses: [AdminPanelEvents],
        protected: false,
    },
    {
        view: PasswordChange,
        path: "/account/password-change",
        additionalClasses: [PasswordChangeEvents],
        protected: true,
    },
    {
        view: AccountPage,
        path: "/account",
        additionalClasses: [AccountPageEvents],
        protected: true,
    },
];
const redirectWhenLogged = ["/login", "/register"];
let sharedEventHandler = null;
const renderPage = async (route) => {
    const view = await new route.view();

    document.querySelector("main").innerHTML = view.getHtml();
    sharedEventHandler.clearPageHandlers();
    for (const Class of route.additionalClasses) {
        const instance = await new Class();
        if (instance?.handlers) {
            sharedEventHandler.registerPageHandlers(instance.handlers, instance);
        }
    }
    history.pushState(null, "", route.path);
};

const isUserAuthorized = (status, route) => {
    if (status === "unauthorized" || status === "missingToken") return false;
    if (route.allowedRoles && !route.allowedRoles.includes(status)) return false;
    return true;
};

const findRouteByPath = (path) => routes.find((r) => r.path === path);

const router = async (path = "/") => {
    try {
        let route = findRouteByPath(path);
        if (!route) {
            route = findRouteByPath("/error-page");
            await renderPage(route);
            return;
        }
        const authorizationStatus = isUserAuthorized(await ApiOperations.userStatus(), route);

        if (redirectWhenLogged.includes(path) && authorizationStatus) {
            route = findRouteByPath("/");
        } else if (route.protected && !authorizationStatus) {
            route = findRouteByPath("/login");
        }

        await renderPage(route);
    } catch (error) {
        console.error("Error:", error);
    }
};
document.addEventListener("DOMContentLoaded", async () => {
    const header = await new Header();
    sharedEventHandler = new SharedEventHandler();
    sharedEventHandler.registerGlobalHandlers(header.handlers, header);
    window.addEventListener("popstate", () => router(window.location.pathname));
    router(window.location.pathname);
});

export default router;
