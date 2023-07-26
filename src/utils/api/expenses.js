const apiUrl = "https://corse-85136420c982.herokuapp.com/http://kacperd.com:2206/api";

export function getExpenses() {

    return fetch(apiUrl + "/Expenses", {
        method: "GET",
        headers: new Headers({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://kacperd.com:2206",
            "Access-Control-Allow-Headers": "X-Requested-With",
            "mode": "no-cors"
        }),
    });
}

export function getExpense(id) {
    return fetch(apiUrl + `/Expenses/${id}`, {
        method: "GET",
        headers: new Headers({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-Requested-With",
            "mode": "no-cors"
        }),
    });
}

export function addExpense(Expense) {
    return fetch(apiUrl + "/Expenses", {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-Requested-With",
            "mode": "no-cors"
        }),
        body: JSON.stringify(Expense),
    });
}

export async function updateExpense(id, updateExpense) {
    return fetch(apiUrl + `/Expenses/${id}`, {
        method: "PUT",
        headers: new Headers({
            "Access-Control-Max-Age": "99999",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-Requested-With",
            "mode": "no-cors"
        }),
        body: JSON.stringify(updateExpense),
    });
}

export function removeExpense(id) {
    return fetch(apiUrl + `/Expenses/${id}`, {
        method: "DELETE",
        headers: new Headers({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-Requested-With",
            "mode": "no-cors"
        }),
    });
}
