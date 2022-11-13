
export const getMessages = (url) => {
    return fetch(url)
    .then((response) => response.json())
    .catch((e) => console.log(e.message) )
}

export const postMessage = (url, todo) => {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
    })
    .then((response) => response.json())
    .catch((e) => console.log(e.message))
}

export const deleteMessage = (url, id) => {
    return fetch(`${url}${id}`, {
        method: "DELETE"
    })
    .catch((e) => console.log(e.message))
}