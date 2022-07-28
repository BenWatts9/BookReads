const baseUrl = "/api/BookStatus"

export const getAllBookStatus = () => {
    return fetch(baseUrl)
    .then((res)=> res.json())
};

export const getBookStatusById = (id) => {
    return fetch(`${baseUrl}/byId/${id}`)
    .then((res)=> res.json())
}


export const getBookStatusByBookId = (bookId) => {
    return fetch(`${baseUrl}/${bookId}`)
    .then((res)=> res.json())
};

export const getBookStatusByUserProfileId = (userProfileId) => {
    return fetch(`${baseUrl}/userGet/${userProfileId}`)
    .then((res)=> res.json())
};

export const addBookStatus = (bookStatus) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bookStatus),
    });
};

export const updateBookStatus = (bookStatus) => {
    return fetch(`${baseUrl}/${bookStatus.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bookStatus),
    });
};

export const deleteBookStatus = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
    });
};

export const addGroupToBookStatus = (bookStatusId, groupId) => {
    return fetch(`${baseUrl}/AddGroupToBook/${bookStatusId}?groupId=${groupId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }})
    .then((res)=> res.json())
}

export const getBooksByGroup = (groupId) => {
    return fetch(`${baseUrl}/BooksByGroup/${groupId}`)
    .then((res)=> res.json())
}
