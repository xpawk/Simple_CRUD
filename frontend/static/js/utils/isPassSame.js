export const isPassSame = (userData, modal) => {
    if (userData.password === userData.password_c) {
        return true;
    } else {
        modal.createModal("Abort", "Passwords are not the same");
        return false;
    }
};
