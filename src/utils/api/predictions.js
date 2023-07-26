const apiUrl = "https://corse-85136420c982.herokuapp.com/http://kacperd.com:2206/api";

export function getPredictions() {
    return fetch(apiUrl + "/Predictions", {
        method: "GET",
        headers: new Headers({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://kacperd.com:2206",
            "Access-Control-Allow-Headers": "X-Requested-With",
            "mode": "no-cors"
        }),
    });
}
