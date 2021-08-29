// import cookie from "/react-cookies";
const cookie = require("react-cookies");
export const getUser = () => {
    return cookie.load("userInfo");
};

export const saveUser = (user: any) => {
    cookie.remove("userInfo");
    cookie.save("userInfo", user, { path: "/" });
};
