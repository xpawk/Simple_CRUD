import { ApiOperations } from "../apiOperations.js";
export default class Header {
    constructor() {
        this.handlers = {
            profile_btn: () => this.openDropDown(),
            "outside&.profile_btn": () => this.closeDropDown(),
            logout: async () => await this.logout(),
        };
        return this.initialize();
    }

    get dropDown() {
        return document.querySelector(".user_box");
    }

    async initialize() {
        try {
            this.user = await ApiOperations.getUser();
            this.renderHeader();
            return this;
        } catch (error) {
            console.error("Error:", error);
        }
    }

    renderHeader() {
        document.querySelector("header").innerHTML += `
            <div class="header_content">
                <a tabindex="3" href="/" route>
                    <img class="logo" src="../static/images/logo.png" />
                    <h1 class="title">WageWise</h1>
                </a>
                ${this.userBox()}
            </div>
        `;
    }
    async logout() {
        const response = await ApiOperations.logOut();
        if (response === "Success") {
            window.location.replace("/");
        }
    }

    closeDropDown() {
        if (this.dropDown.classList.contains("active")) {
            this.dropDown.classList.remove("active");
        }
    }

    openDropDown() {
        this.dropDown.classList.toggle("active");
    }

    userBox() {
        return this.user && this.user.username
            ? `
        <div class="user_box">
            <div class="profile_btn">
            <p>${this.user.username}</p>
            <i class="ri-arrow-down-s-line"></i>
            </div>
            <div class="dropdown">
            <a tabindex="3" href="/account" route class="dropdown_item"><i class="ri-user-line ri-lg"></i>Account Settings</a>
            <button class="dropdown_item logout"><i class="ri-logout-box-line ri-lg"></i>Log Out</button>
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
