import { ISaveBooking } from "../interfaces/interfaces"

export const saveBooking = (booking: ISaveBooking) => {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/booking`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(booking)
    })
        .then(response => response.json())
}