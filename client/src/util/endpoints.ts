/* API endpoint locally */
// From previous project: https://csil-git1.cs.surrey.sfu.ca/415-hha_cbr/cbr-platform
export const API_URL =
    process.env.NODE_ENV === "development"
        ? `http://${window.location.hostname}:5000/api/`
        : "/api/";

export enum Endpoint {
    REGISTER = "register",
    GAME = "game",
    TIME = "time",
}

export const RestAPIFetch = async (
    endpoint: Endpoint,
    urlPara: string = "",
    myInit: RequestInit = {}
): Promise<Response> => {
    const theInit: RequestInit = {
        ...myInit,
        headers: {
            "Content-Type": "application/json",
            ...myInit.headers,
        },
    };

    if (theInit.body instanceof FormData) {
        delete (theInit.headers as any)["Content-Type"];
    }

    return fetch(API_URL + endpoint + urlPara, theInit).then(async (resp) => {
        if (!resp.ok) {
            const msg = "API Fetch failed with HTTP Status " + resp.status;
            return Promise.reject(msg);
        }
        return resp;
    });
};

export const APILoadError = "APILoadError";
export type TAPILoadError = typeof APILoadError;
