function _curry(fn) {
  return function(a, b) {
    return arguments.length === 2 ? fn(a, b) : function(b) { return fn(a, b) }
  }
};

function _curryr(fn) {
  return function(a, b) {
    return arguments.length === 2 ? fn(a, b) : function(b) { return fn(b, a) }
  }
};

function _filter(list, predi) {
  var new_list = [];
  _each(list, function(val) {
    if(predi(val)) new_list.push(val);
  });
  return new_list;
}

function _map(list, mapper) {
  var new_list = [];
  _each(list, function(val){
    new_list.push(mapper(val));
  });
  return new_list;
}

function _each(list, iter) {
  for(var i = 0; i < list.length; i++) {
    iter(list[i]);
  }
  return list;
};

var _get = _curryr(function(obj, key) {
  return obj == null ? undefined : obj[key]
})

// 4. _reduce 만들기
// 기존 Array 내장함수 slice를 사용할 경우엔, Array Like 객체를 이용할 수 없기 때문에,
// Array.prototype.slice.call을 사용해 _rest를 구현, 재활용성을 높인다.
var slice = Array.prototype.slice
function _rest(list, num) {
  return slice.call(list, num || 1);
}

function _reduce(list, iter, memo) {
  if(arguments.length == 2) {
    memo = list[0];
    list = _rest(list);
  }
  _each(list, function(val) {
    memo = iter(memo, val)
  });
  return memo;
}

var add = _curry(function(a, b) { return a + b })

console.log(
  _reduce([1,2,3], add, 10));
console.log(
  _reduce([1,2,3], add));
