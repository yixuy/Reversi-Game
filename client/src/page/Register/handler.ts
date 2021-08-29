import { FormikHelpers } from "formik";
import history from "../../util/history";
import { RestAPIFetch, Endpoint } from "../../util/endpoints";
import { TNewUserValues } from "./fields";
import { saveUser } from "../../util/cookie";

export const addUser = async (userInfo: string) => {
    const init: RequestInit = {
        method: "POST",
        body: userInfo,
    };

    return await RestAPIFetch(Endpoint.REGISTER, "", init).then((res) => {
        return res.ok;
    });
};

export const handleNewSubmit = async (
    values: TNewUserValues,
    helpers: FormikHelpers<TNewUserValues>
) => {
    const newUser = JSON.stringify({
        username: values.username,
        first_name: values.first_name,
        last_name: values.last_name,
        gender: values.gender,
    });
    try {
        saveUser(newUser);
        return history.push("/Game");
    } catch (e) {
        alert(e);
        helpers.setSubmitting(false);
    }
};
