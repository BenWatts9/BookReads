const baseUrl = "/api/BookStatus"

export const getAllBookStatus = () => {
    return fetch(baseUrl)
    .then((res)=> res.json())
};

export const getBookStatusByBookId = (bookId) => {
    return fetch(`${baseUrl}/${bookId}`)
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
    return fetch(`${baseUrl}/${bookStatusId}?groupId=${groupId}`)
    .then((res)=> res.json())
}

