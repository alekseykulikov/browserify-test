var _ = require('lodash');

exports.sum = function sum() {
  return _.reduce(arguments, function(memo, val) { return memo += val });
};

exports.odd = function odd() {
  return _.reduce(arguments, function(memo, val) { return memo -= val });
};

exports.mul = function mul() {
  return _.reduce(arguments, function(memo, val) { return memo *= val });
};
