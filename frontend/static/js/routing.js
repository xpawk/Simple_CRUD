import Home from "./subpages/home.js";
import { Events } from "./events.js";

const router = async () => {
  try {
    const view = await new Home();
    document.querySelector("#app").innerHTML = await view.getHtml();
    Events.eventHandler();
  } catch (error) {
    console.log(error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  router();
});
