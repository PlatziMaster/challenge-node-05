const db = {
    'user': [
        { id: '1', name: 'Andres' },
    ],
};

async function list(collection) {
    return db[collection];
}

async function get(collection, id) {
    let col =await list(collection);
    return col.filter(item => item.id === id)[0] || null;
}

async function upsert(collection, data) {
    db[collection].push(data);
}

async function remove(collection, id) {
    return true;
}

module.exports = {
    list,
    get,
    upsert,
    remove,
};