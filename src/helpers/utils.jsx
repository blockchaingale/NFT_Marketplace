export const getFromLocalStorage = (key) => {
  const expiry = JSON.parse(localStorage.getItem("expiry"));
  if (new Date().getTime() > expiry) {
    localStorage.removeItem("connection");
    return false;
  } else {
    return JSON.parse(localStorage.getItem(key));
  }
};

export const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getImageUrl = (name) => {
  return new URL(`../assets/${name}`, import.meta.url).href;
};

export function numberToTwoDecimals(num) {
  if (num) {
    var with2Decimals = num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
    return Number(with2Decimals);
  } else {
    return 0;
  }
}
