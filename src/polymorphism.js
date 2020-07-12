var users = [
  { id: 1, name: 'ID', age: 36},
  { id: 2, name: 'BJ', age: 32},
  { id: 3, name: 'JM', age: 32},
  { id: 4, name: 'PJ', age: 27},
  { id: 5, name: 'HA', age: 25},
  { id: 6, name: 'JE', age: 26},
  { id: 7, name: 'JI', age: 31},
  { id: 8, name: 'MP', age: 23},
];

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

var _get = _curryr(function(obj, key) {
  return obj == null ? undefined : obj[key]
})


var _length = _get('length');

function _each(list, iter) {
  var keys = _keys(list)
  for(var i = 0, len = keys.length; i < len; i++) {
    iter(list[keys[i]]);
  }
  return list;
};

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

function _pipe() {
  var fns = arguments;
  return function(arg) {
    return _reduce(fns, function(arg, fn) {
      return fn(arg)
    }, arg);
  }
}

function _go(arg) {
  var fns = _rest(arguments);
  return _pipe.apply(null, fns)(arg);
}


var _map = _curryr(_map), _filter = _curryr(_filter)

// 6. _each의 외부 다형성 높이기
  // 1. _each에 null 넣어도 에러 안나게
_each(null, console.log)
_go(
  null,
  _filter((v) => v % 2),
  _map((v) => v * v),
  console.log
);

  // 2. _keys 만들기
console.log( Object.keys({ name: 'ID', age: '20'}) );
console.log( Object.keys([ 1, 2, 3, 4]) );
console.log( Object.keys(10) );
// error
// console.log( Object.keys(null) );

console.clear();

  // 3. keys에서도 _is_obj인지 검사하여 null 에러 안나게

function _is_obj(obj) {
  return typeof obj == 'object' && !!obj;
}

function _keys(obj) {
  return _is_obj(obj) ? Object.keys(obj) : [];
}

console.log( _keys({ name: 'ID', age: '20'}) );
console.log( _keys([ 1, 2, 3, 4]) );
console.log( _keys(10) );
console.log( _keys(null) );

console.clear();

  // 4. _each 외부 다형성 높이기
  // _each를 obj의 value로도 가능하게

_each(
  {13: 'ID', 18: 'PD', 20: 'SY'},
  function(name) { console.log(name) }
);

_go(
  {13: 'ID', 18: 'PD', 20: 'SY'},
  _map((name) => name.toLowerCase()),
  console.log
);

_go(
  users,
  _map(_get('name')),
  _map(name => name.toLowerCase()),
  console.log
);


// 함수형 프로그래밍은 오류 데이터가 들어와도 그럴듯하게 처리하므로써 다형성을 극대화 시킨다.
