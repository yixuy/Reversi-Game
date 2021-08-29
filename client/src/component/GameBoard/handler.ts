import { RestAPIFetch, Endpoint } from "../../util/endpoints";
import { getUser } from "../../util/cookie";

export const addUser = async (userInfo: any) => {
    const init: RequestInit = {
        method: "POST",
        body: userInfo,
    };

    return RestAPIFetch(Endpoint.GAME, "", init).then((res) => {
        return res.ok;
    });
};

export const handleResultSubmit = async (values: number) => {
    const userInfo = getUser();

    try {
        const newUser = JSON.stringify({
            username: userInfo.username,
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            gender: userInfo.gender,
            score: values,
        });
        const res = await addUser(newUser);
        if (!res) {
            alert("Result has not been recorded in the database");
        }
    } catch (e) {
        alert(e);
    }
};
