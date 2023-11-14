import { ApiOperations } from "../apiOperations.js";
export default class Header {
    constructor() {
        this.handlers = {
            profile_btn: () => this.openDropDown(),
        };
        return this.initialize();
    }

    async initialize() {
        try {
            this.user = await ApiOperations.getUser();
            this.renderHeader();
            this.dropDown = document.querySelector(".user_box");
            return this;
        } catch (error) {
            console.error("Error:", error);
        }
    }

    renderHeader() {
        document.querySelector("header").innerHTML += `
            <div class="header_content">
                <a tabindex="3" href="/" route>
                    <img class="logo" src="./static/images/logo.png" />
                    <h1 class="title">WageWise</h1>
                </a>
                ${this.userBox()}
            </div>
        `;
    }

    openDropDown() {
        this.dropDown.classList.add("active");
    }

    userBox() {
        return this.user && this.user.username
            ? `
        <div class="user_box">
            <div class="profile_btn">
            <p>${this.user.username}</p>
            <i class="ri-arrow-down-s-line"></i>
            </div>
        </div>
        `
            : `
        <div class="user_box">
            <i class="ri-user-line ri-lg"></i>
            <a tabindex="3" class="login_btn" href="/login" route> Login</a>
            <span> / </span>
            <a tabindex="3" class="register_btn" href="/register" route> Register</a>
        </div>
        `;
    }
}
