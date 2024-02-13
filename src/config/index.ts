export const getTokenFromStorage = () => {
    return localStorage.getItem('token') || null
}

export const getGithubAuthHeader = () => `Bearer ${getTokenFromStorage()}`
