const store = require('../../../store/mongo');
const ctrl = require('./controller');

module.exports = ctrl(store);