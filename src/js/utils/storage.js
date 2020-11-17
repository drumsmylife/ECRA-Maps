//
export const store = (key, value) => localStorage.setItem(key, JSON.stringify(value));

// this function will retrieve data 
export const retrieve = (key) => JSON.parse(localStorage.getItem(key));