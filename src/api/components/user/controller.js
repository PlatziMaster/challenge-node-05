const nanoid = require('nanoid');

const COLLECTION = 'user';

module.exports = function(injectedStore){
    let store = injectedStore;
    if(!store){
        store = require('../../../store/dummy');
    }
    
    function list() {
        return store.list(COLLECTION);
    }

    function get(id) {
        return store.get(COLLECTION, id);
    }

    function upsert(body){
        const user = {
            name: body.name
        }
        if(body.id){
            user.id = body.id;
        }else {
            user.id = nanoid();
        }
        return store.upsert(COLLECTION, user);
    }

    return {
        list,
        get,
        upsert
    }
}
