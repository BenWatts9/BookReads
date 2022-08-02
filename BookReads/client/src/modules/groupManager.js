const baseUrl = '/api/Group'

export const getAllUserGroups = (id) => {
    return fetch(`${baseUrl}/${id}`)
    .then((res)=> res.json())
}

export const addGroup = (group) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(group)
    })
}


export const deleteGroup = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
    });
};

export const getGroupByBookStatus = (id) => {
    return fetch(`${baseUrl}/GroupByBookStatus/${id}`)
    .then((res)=> res.json())
}