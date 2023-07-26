const apiUrl = "https://corse-85136420c982.herokuapp.com/http://kacperd.com:2206/api";

export function getCategories() {

    return fetch(apiUrl + "/Categories", {
        method: "GET",
        headers: new Headers({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://kacperd.com:2206",
            "Access-Control-Allow-Headers": "X-Requested-With",
            "mode": "no-cors"

        }),
    });
}

export function getCategory(id) {
    return fetch(apiUrl + `/Categories/${id}`, {
        method: "GET",
        headers: new Headers({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-Requested-With",
            "mode": "no-cors"
        }),
    });
}

export function addCategory(category) {
    return fetch(apiUrl + "/Categories", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-Requested-With",
            "mode": "no-cors"
        }),
        body: JSON.stringify(category),
    });
}

export async function updateCategory(id, updateCategory) {
    return fetch(apiUrl + `/Categories/${id}`, {
        method: "PUT",
        headers: new Headers({
            "Access-Control-Max-Age": "99999",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://kacperd.com:2206",
            "Access-Control-Allow-Headers": "X-Requested-With",
            "mode": "no-cors",
            "X-Requested-With": "XMLHttpRequest",
            "Origin": "http://kacperd.com:2206",
            "Host": "http://kacperd.com:2206"
        }),
        body: JSON.stringify(updateCategory),
    });
}

export function removeCategory(id) {
    return fetch(apiUrl + `/Categories/${id}`, {
        method: "DELETE",
        headers: new Headers({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-Requested-With",
            "mode": "no-cors"
        }),
    });
}
