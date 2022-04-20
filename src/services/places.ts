

export const getPlaces = () => fetch(`${process.env.REACT_APP_BACKEND_URL}/places`)
    .then(response => response.json())

export const getBookings = (placeId: string) => fetch(`${process.env.REACT_APP_BACKEND_URL}/booking/${placeId}`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
})
    .then(response => response.json())