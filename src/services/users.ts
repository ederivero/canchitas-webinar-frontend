import { INewUser } from "../interfaces/interfaces";

export const register = (user_data: INewUser) => fetch(`${process.env.REACT_APP_BACKEND_URL}/users/register`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(user_data)
})
    .then(response => response.json())