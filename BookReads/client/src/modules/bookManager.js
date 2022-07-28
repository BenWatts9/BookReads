const baseUrl = '/api/Book';

export const getAllBooks = () => {
    return fetch(baseUrl)
    .then((res)=> res.json())
}