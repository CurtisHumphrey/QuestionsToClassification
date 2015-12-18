require('babel/register');

process.env.NODE_ENV = 'production';
const config   = require('./config');
module.exports = require('./build/webpack/' + config.get('env'));
