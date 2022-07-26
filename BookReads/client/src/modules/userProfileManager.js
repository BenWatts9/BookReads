import { getToken } from "./authManager";
const baseUrl = "/api/UserProfile";

export const getAllActiveUsers= () => {
    return fetch(baseUrl).then((response) =>response.json())
};

export const getLoggedInUser = () => {
    return getToken().then((token) =>
      fetch(baseUrl + `/GetCurrentUserInfo`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => response.json())
    );
  };

  export const getUserById = (id) => {
    return fetch(`${baseUrl}/GetUser/${id}`)
    .then((res)=>res.json())
  }