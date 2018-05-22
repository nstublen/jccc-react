let storage = {
    "1": {
        id: 1,
        text: "Add POST support for creating a new item",
        completedTime: null,
        expiration: null
    },
    "3": {
        id: 3,
        text: "Add GET support for individual items",
        completedTime: "2018-04-14T12:44:12Z",
        expiration: null
    }
};

let id = Math.max(...Object.keys(storage));
console.log("Last ID = " + id);

function cleanItem(item) {
    let clean = Object.assign({}, item);
    delete item.expiration;
}

function cleanItems(items) {
    return items.map(item => cleanItem(item));
}

function defaultItem() {
    let id = uniqueId();
    console.log("New item ID = " + id);
    return {
        id,
        text: null,
        completedTime: null,
        // New items *may* disappear after an hour.
        expiration: new Date(new Date().getTime() + 3600000)
    }
}

function expireItems(items) {
    let now = new Date();
    return items.filter(item => item.expiration > now);
}

function uniqueId() {
    return ++id;
}

function createItem(item) {
    return new Promise((resolve, reject) => {
        let newItem = Object.assign(defaultItem(), item);
        storage[newItem.id] = newItem;
        resolve(newItem);
    });
}

function deleteItem(itemId) {
    return new Promise((resolve, reject) => {
        if (!storage.hasOwnProperty(itemId)) {
            resolve(null);
            return;
        }

        let item = storage[itemId];
        delete item.id;

        delete storage[itemId];
        resolve(item);
    });
}

function getItem(itemId) {
    return new Promise((resolve, reject) => {
        if (!storage.hasOwnProperty(itemId)) {
            resolve(null);
            return;
        }
        resolve(storage[itemId]);
    });
}

function getItems() {
    return new Promise((resolve, reject) => {
        let values = Object.keys(storage).map(key => storage[key]);
        resolve(values);
    });
}

function updateItem(itemId, item) {
    return new Promise((resolve, reject) => {
        if (item.hasOwnProperty("id") && item.id != itemId) {
            resolve(null);
            return;
        }
        if (!storage.hasOwnProperty(itemId)) {
            resolve(null);
            return;
        }
        storage[itemId] = Object.assign(storage[itemId], item, { id: Number(itemId) });
        console.log(storage[itemId]);
        resolve(storage[itemId]);
    });
}

module.exports = {
    createItem,
    deleteItem,
    getItem,
    getItems,
    updateItem
}
