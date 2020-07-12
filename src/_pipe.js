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

function _each(list, iter) {
  for(var i = 0; i < list.length; i++) {
    iter(list[i]);
  }
  return list;
};

var _get = _curryr(function(obj, key) {
  return obj == null ? undefined : obj[key]
})

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

// 5. 파이프 만들기
  // 1. _pipe 함수

function _pipe() {
  var fns = arguments;
  return function(arg) {
    return _reduce(fns, function(arg, fn) {
      return fn(arg)
    }, arg);
  }
}

var f1 = _pipe(
  function(a) { return a + 1 },
  function(a) { return a * 2 },
  function(a) { return a * a },
)

console.log( f1(1) );

  // 2. _go 함수
  // _pipe의 즉시 실행 버전

function _go(arg) {
  var fns = _rest(arguments);
  return _pipe.apply(null, fns)(arg);
}

_go(
  1,
  function(a) { return a + 1 },
  function(a) { return a * 2 },
  function(a) { return a * a },
  console.log
)

  // 3. user에 _go 적용

// 기존 코드
console.log(
  _map(
    _filter(users, function(user) { return user.age >= 30 }),
    _get('name')
  )
);

// 기존 코드에 _go 적용
_go(
  users,
  function(users) {
    return _filter(users, function(user) {
      return user.age >= 30;
    });
  },
  function(users) {
    return _map(users, _get('name'));
  },
  console.log
);

_go(
  users,
  function(users) {
    return _filter(users, function(user) {
      return user.age < 30;
    });
  },
  function(users) {
    return _map(users, _get('age'));
  },
  console.log
);

// _map, _filter에 _curryr 적용해서 더 간결하게
var _map = _curryr(_map), _filter = _curryr(_filter)

_go(
  users,
  _filter(user => user.age >= 30),
  _map(_get('name')),
  console.log
);

_go(
  users,
  _filter(user => user.age > 30),
  _map(_get('age')),
  console.log
);


// 함수형 프로그래밍
// 순수 함수들의 평가시점을 다루면서 조합성을 강조하는 프로그래밍
// 추상화의 단위를 함수로 하는 프로그래밍

// 화살표 함수
var a = function(user) { return user.age >= 30 };
var a = (user) => user.age >= 30;

// 화살표 함수에서 객체 리턴 시 ()괄호를 한번 더 씌워준다.
var o = (a, b) => ({ val: a + b })
