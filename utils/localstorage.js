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
        let value;
        try {
          value = JSON.parse(valueFromLS);
        } catch (e) {
          value = defaultValue;
        }
        resolve(value);
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

const reactLocalStorage = new WindowLocalStorage();
export { reactLocalStorage };
