var jwt = require('jsonwebtoken');

module.exports = {
  loadPriority:  1000,
  startPriority: 1000,
  stopPriority:  1000,
  initialize: function(api, next){
    api.jwt = {};

    next();
  },
  start: function(api, next){

    api.jwt = jwt;

    next();
  },
  stop: function(api, next){
    // disconnect from server
    next();
  }
}