var minerva = require('./minerva')
  , feedback = require('./feedback.resource');

exports.register = function (app) {
  minerva.register(app);
  feedback.register(app);
};


