import Events from './events.js';
import AdminPanel from './subPages/adminPanel.js';
import Home from './subPages/home.js';

const router = async () => {
    try {
        const routes = [
            {
                view: AdminPanel,
                path: '/adminPanel',
                additionalClasses: [Events],
            },
            { view: Home, path: '/', additionalClasses: [] },
        ];
        routes.forEach(async (el) => {
            if (el.path === window.location.pathname) {
                const view = await new el.view();
                document.querySelector('#app').innerHTML = await view.getHtml();
                el.additionalClasses.forEach(async (classInstance) => {
                    await new classInstance();
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    router();
});
