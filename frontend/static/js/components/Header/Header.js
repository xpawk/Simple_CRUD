export default class Header {
    constructor(user) {
        this.user = user;
    }

    dropdownMenu() {
        return `
        <div class="dropdown_menu">
            <p>anything</p>
        </div>
        `;
    }

    userBox() {
        return this.user && this.user.username
            ? `
        <div class="user_box">
            <div class="profile_btn">
            <p>${this.user.username}</p>
            <i class="ri-arrow-down-s-line"></i>
            ${this.dropdownMenu()}
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

    getHtml() {
        return `
        <header>
        <div class="header_content">
            <a tabindex="3" href="/" route>
                <img class="logo" src="./static/images/logo.png" />
                <h1 class="title">User Management</h1>
            </a>
            ${this.userBox()}
        </div>
    </header>
        `;
    }
}
