

export const logIn = (credentials: { email: string, password: string }) => fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
})
    .then(response => response.json())


export const isAuthenticated = () => {
    const token = localStorage.getItem('accessToken')
    if (token) {
        const payload = JSON.parse(window.atob(token.split('.')[1]))
        if (payload.exp > Date.now() / 1000) {
            return true
        }
    }
    return false
}