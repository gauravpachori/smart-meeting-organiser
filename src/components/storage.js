const checkStorageSupported = () => {
    var test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
}

export const isStorageSupported = checkStorageSupported();

export const storeToLocalStorage = (prop, value) => {
    if (isStorageSupported) {
        localStorage.setItem(prop, JSON.stringify(value));
    }
}

export const getFromLocalStorage = (prop) => {
    if (isStorageSupported) {
        var propValue = localStorage.getItem(prop);
        return propValue === null ? {} : JSON.parse(propValue);
    }
}

export const deleteItemFromStorage = (prop) => {
    if (isStorageSupported) {
        localStorage.removeItem(prop);
    }
}