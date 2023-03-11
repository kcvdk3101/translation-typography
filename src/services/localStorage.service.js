class LocalStorageService {
  get(key) {
    const getValue = localStorage.getItem(key);
    if (!getValue) return null;
    return JSON.parse(getValue);
  }
  set(key, value) {
    localStorage.setItem(key, value);
  }
  remove(key) {
    localStorage.removeItem(key);
  }
}

export const localStorageService = new LocalStorageService();
