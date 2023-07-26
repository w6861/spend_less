const apiUrl = "https://corse-85136420c982.herokuapp.com/http://kacperd.com:2206/api";

export function getRaports() {
    return fetch(apiUrl + "/Raports", {
        method: "GET",
        headers: new Headers({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://kacperd.com:2206",
            "Access-Control-Allow-Headers": "X-Requested-With",
            "mode": "no-cors",
        }),
    });
}

export function getRaport(timeFrom, timeTo) {
    return fetch(apiUrl + "/Raports?From=" + timeFrom + "&To=" + timeTo, {
        method: "GET",
        headers: new Headers({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://kacperd.com:2206",
            "Access-Control-Allow-Headers": "X-Requested-With",
            "mode": "no-cors",
        }),
    });
}
