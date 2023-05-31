import AdminPanel from './subPages/adminPanel.js';
import Home from './subPages/home.js';
import { Events } from './events.js';
const router = async () => {
    try {
        const routes = [
            { view: AdminPanel, path: '/adminPanel' },
            { view: Home, path: '/' },
        ];
        routes.forEach(async (el) => {
            if (el.path === window.location.pathname) {
                const view = await new el.view();
                document.querySelector('#app').innerHTML = await view.getHtml();
                Events.eventHandler();
            }
        });
    } catch (error) {
        console.log(error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    router();
});
