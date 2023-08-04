function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getItem(key) {
  const storedState = localStorage.getItem(key);

  if (!storedState) {
    return null;
  }

  return JSON.parse(storedState);
}

function removeItem(key) {
  localStorage.removeItem(key);
}

function clear() {
  localStorage.clear();
}

const storage = {
  setItem,
  getItem,
  removeItem,
  clear,
};

export default storage;
