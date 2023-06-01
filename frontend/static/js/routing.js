import Events from './subPages/adminPanel/events.js';
import AdminPanel from './subPages/adminPanel/adminPanel.js';
import Home from './subPages/home.js';

const routes = [
    {
        view: AdminPanel,
        path: '/adminPanel',
        additionalClasses: [Events],
    },
    { view: Home, path: '/', additionalClasses: [] },
];

const router = async (path = '/') => {
    try {
        for (const route of routes) {
            if (route.path === path) {
                const view = await new route.view();
                document.querySelector('#app').innerHTML = await view.getHtml();
                for (const Class of route.additionalClasses) {
                    await new Class();
                }
                break;
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const handleNavigation = (e) => {
    if (e.target.matches('a') && e.target.hasAttribute('route')) {
        e.preventDefault();
    }
    const path = e.target.getAttribute('href');
    history.pushState(null, '', path);
    router(path);
};

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', handleNavigation);
    window.addEventListener('popstate', () => router(window.location.pathname));
    router(window.location.pathname);
});
