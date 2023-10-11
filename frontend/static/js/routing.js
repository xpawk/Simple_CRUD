import AdminPanelEvents from "./subPages/adminPanel/AdminPanelEvents.js";
import AdminPanel from "./subPages/adminPanel/adminPanel.js";
import Home from "./subPages/home.js";
import LoginPage from "./subPages/login/loginPage.js";
import LoginEvents from "./subPages/login/loginEvents.js";
import PasswordReset from "./subPages/passwordReset.js";
import Register from "./subPages/register.js";
import PasswordChange from "./subPages/passwordChange/passwordChange.js";
import PasswordChangeEvents from "./subPages/passwordChange/passwordChangeEvents.js";
import ErrorPage from "./subPages/errorPage.js";
import { ApiOperations } from "./apiOperations.js";

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
    { view: LoginPage, path: "/login", additionalClasses: [LoginEvents], protected: false },
    { view: PasswordReset, path: "/password-reset", additionalClasses: [], protected: false },
    {
        view: Register,
        path: "/register",
        additionalClasses: [AdminPanelEvents],
        protected: false,
    },
    {
        view: PasswordChange,
        path: "/password-change",
        additionalClasses: [PasswordChangeEvents],
        protected: true,
    },
];

const renderPage = async (route) => {
    const view = new route.view();
    if (typeof view.initialize === "function") {
        await view.initialize();
    }
    document.querySelector("#app").innerHTML = view.getHtml();
    for (const Class of route.additionalClasses) {
        new Class();
    }
    history.pushState(null, "", route.path);
};

const isUserAuthorized = (status, route) => {
    if (status === "unauthorized" || status === "missingToken") return false;
    if (route.allowedRoles && !route.allowedRoles.includes(status)) return false;
    return true;
};

const router = async (path = "/") => {
    try {
        const status = await ApiOperations.userStatus();
        let route = routes.find((r) => r.path === path);

        if (!route) {
            route = routes.find((r) => r.path === "/error-page");
        }

        if (route.protected && !isUserAuthorized(status, route)) {
            route = routes.find((r) => r.path === "/login");
        }

        await renderPage(route);
    } catch (error) {
        console.log(error);
    }
};

const handleNavigation = (e) => {
    if (e.target.matches("a") && e.target.hasAttribute("route")) {
        e.preventDefault();
        if (e.target.classList.contains("go-back")) {
            window.history.go(-2);
        } else {
            const path = e.target.getAttribute("href");
            router(path);
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", handleNavigation);
    window.addEventListener("popstate", () => router(window.location.pathname));
    router(window.location.pathname);
});
