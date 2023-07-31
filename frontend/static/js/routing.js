import Events from "./events.js";
import AdminPanel from "./subPages/adminPanel/adminPanel.js";
import Home from "./subPages/home.js";
import LoginPage from "./subPages/loginPage.js";
import PasswordReset from "./subPages/passwordReset.js";
import Register from "./subPages/register.js";
import PasswordChange from "./subPages/passwordChange.js";
const routes = [
    {
        view: AdminPanel,
        path: "/adminPanel",
        additionalClasses: [Events],
    },
    { view: Home, path: "/", additionalClasses: [] },
    { view: LoginPage, path: "/login", additionalClasses: [Events] },
    { view: PasswordReset, path: "/password-reset", additionalClasses: [] },
    { view: Register, path: "/register", additionalClasses: [Events] },
    {
        view: PasswordChange,
        path: "/password-change",
        additionalClasses: [Events],
    },
];

export const router = async (path = "/") => {
    try {
        for (const route of routes) {
            if (route.path === path) {
                const view = await new route.view();
                document.querySelector("#app").innerHTML = await view.getHtml();
                for (const Class of route.additionalClasses) {
                    await new Class();
                }
                history.pushState(null, "", path);
                break;
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const handleNavigation = (e) => {
    if (e.target.matches("a") && e.target.hasAttribute("route")) {
        e.preventDefault();
    }
    const path = e.target.getAttribute("href");
    router(path);
};

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", handleNavigation);
    window.addEventListener("popstate", () => router(window.location.pathname));
    router(window.location.pathname);
});
