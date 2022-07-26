const baseUrl = '/api/Group'

export const getAllUserGroups = (id) => {
    return fetch(`${baseUrl}/${id}`)
    .then((res)=> res.json())
}