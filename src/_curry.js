// 1. _curry, _curryr
function _curry(fn) {
  return function(a, b) {
    return arguments.length === 2 ? fn(a, b) : function(b) { return fn(a, b) }
  }
};

var add = _curry(function(a, b) {
  return a + b;
});

var add10 = add(10);
var add5 = add(5);

console.log(add10(5));
console.log(add5(5));
console.log(add(5)(3));
console.log(add(1, 2));
