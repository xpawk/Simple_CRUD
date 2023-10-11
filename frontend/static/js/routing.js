import Events from "./events.js";
import AdminPanel from "./subPages/adminPanel/adminPanel.js";
import Home from "./subPages/home.js";
import LoginPage from "./subPages/loginPage.js";
import PasswordReset from "./subPages/passwordReset.js";
import Register from "./subPages/register.js";
import PasswordChange from "./subPages/passwordChange.js";
import ErrorPage from "./subPages/errorPage.js";
import { ApiOperations } from "./apiOperations.js";

const routes = [
    {
        view: AdminPanel,
        path: "/adminPanel",
        additionalClasses: [Events],
        protected: true,
    },
    {
        view: ErrorPage,
        path: "/error-page",
        additionalClasses: [],
        protected: false,
    },
    { view: Home, path: "/", additionalClasses: [], protected: false },
    { view: LoginPage, path: "/login", additionalClasses: [Events], protected: false },
    { view: PasswordReset, path: "/password-reset", additionalClasses: [], protected: false },
    { view: Register, path: "/register", additionalClasses: [Events], protected: false },
    {
        view: PasswordChange,
        path: "/password-change",
        additionalClasses: [Events],
        protected: true,
    },
];

const isProtectedRoute = (path) => {
    const route = routes.find((r) => r.path === path);
    return route && route.protected;
};

const isUserAuthorized = (status) => {
    return !(status === "unauthorized" || status === "missingToken");
};

const router = async (path = "/") => {
    try {
        const status = await ApiOperations.checkEnv();

        if (isProtectedRoute(path) && !isUserAuthorized(status)) {
            path = "/login";
        }

        let routeFound = false;

        for (const route of routes) {
            if (route.path === path) {
                routeFound = true;
                const view = new route.view();
                if (typeof view.initialize === "function") {
                    await view.initialize();
                }

                document.querySelector("#app").innerHTML = view.getHtml();
                for (const Class of route.additionalClasses) {
                    new Class();
                }
                history.pushState(null, "", path);
                break;
            }
        }

        if (!routeFound) {
            router("/error-page");
        }
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
