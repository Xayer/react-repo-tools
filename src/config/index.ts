export const tokenName = 'token';
export const getTokenFromStorage = () => {
  return localStorage.getItem(tokenName) || null;
};

export const setToken = (token: string) => {
  localStorage.setItem(tokenName, token);
};

export const removeTokenFromStorage = () => {
  localStorage.removeItem(tokenName);
};
export const getGithubAuthHeader = () => `Bearer ${getTokenFromStorage()}`;
