const rememberKey = "Remember_Me";

export const rememberMe = value => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(rememberKey, value)
  }

};

export const getRememberValue = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(rememberKey);
  }
};

