function debounce(func, wait) {
  let timeout;

  return function x(...args) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(this, args);
    }, wait);
  };
}

function onlyUnique(value, index, self): boolean {
  return self.indexOf(value) === index;
}

const priceToLocaleString = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}
const isDigit = (str) => {
  return /^\d+$/.test(str);
};

const WindowLocalStorage = function reactLocalStorage() {
  const set = function set(key, value) {
    localStorage[key] = value;

    return localStorage[key];
  };
  const get = function get(key, defaultValue = undefined, silent = true) {
    const value = localStorage.getItem(key) || defaultValue;
    if (!silent && !value) throw Error(`${key} not found in localStorage`);

    return value;
  };
  const setObject = function setObject(key, value) {
    return Promise.resolve().then(() => {
      localStorage.setItem(key, JSON.stringify(value));

      return localStorage[key];
    });
  };
  const getObject = function getObject(key, defaultValue = {}, silent = true) {
    return new Promise((resolve, reject) => {
      const valueFromLS = this.get(key, JSON.stringify(defaultValue), silent);
      if (valueFromLS) {
        resolve(JSON.parse(valueFromLS));
      }
      reject(new Error('No Data!'));
    });
  };
  const clear = function clear() {
    return localStorage.clear();
  };
  const remove = function remove(key) {
    return localStorage.removeItem(key);
  };
  const noStorage = function noStorage() {
    return {};
  };
  if (typeof window !== 'undefined') {
    return {
      set,
      get,
      setObject,
      getObject,
      clear,
      remove,
    };
  }

  return {
    set: noStorage,
    get: noStorage,
    setObject: noStorage,
    getObject: noStorage,
    clear: noStorage,
    remove: noStorage,
  };
};

const reactLocalStorage = new (WindowLocalStorage as any)();

const getParameterByName = (name, url = window?.location?.href) => {
  name = name.replace(/[[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

const b64toFile = async (base64String) => {
  return fetch(base64String)
    .then((res) => res.blob())
    .then((blob) => {
      const file = new File([blob], 'File name', { type: 'image/png' });

      return file;
    });
};

function downloadURI(uri, name) {
  const link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export {
  debounce,
  arraysEqual,
  isDigit,
  onlyUnique,
  priceToLocaleString,
  reactLocalStorage,
  getParameterByName,
  b64toFile,
  downloadURI,
};
