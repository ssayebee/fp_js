var users = [
  { id: 10, name: 'ID', age: 36},
  { id: 20, name: 'BJ', age: 32},
  { id: 31, name: 'JM', age: 32},
  { id: 44, name: 'PJ', age: 27},
  { id: 50, name: 'HA', age: 25},
  { id: 62, name: 'JE', age: 26},
  { id: 72, name: 'JI', age: 31},
  { id: 80, name: 'MP', age: 16},
  { id: 81, name: 'SP', age: 17},
  { id: 90, name: 'ND', age: 26},
  { id: 93, name: 'MS', age: 31},
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
  _each(list, function(val, key){
    new_list.push(mapper(val, key));
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
    iter(list[keys[i]], keys[i]);
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

function _is_obj(obj) {
  return typeof obj == 'object' && !!obj;
}

function _keys(obj) {
  return _is_obj(obj) ? Object.keys(obj) : [];
}

// 컬렉션 중심 프로그램의 유형별 함수 만들기

// 1. 수집하기 - map
//  1. _values
var _values = _map(_identity);
function _identity(val) {
  return val;
}

console.log(_keys(users[0]));
console.log(_values(users[0]));



//  2. _plunk
function _plunk(data, key) {
  return _map(data, _get(key));
}

console.log(_plunk(users, 'name'));
console.log(_plunk(users, 'age'));
console.log(_plunk(users, 'id'));



// 2. 거르기 _filter
//  1. _reject

function _negate(fun) {
  return function(val) {
    return !fun(val);
  }
};

var _reject = _curryr(function(data, predi) {
  return _filter(data, _negate(predi));
});

console.log(_reject(users, function(user) {
  return user.age > 30;
}));
console.log(_reject(users, function(user) {
  return user.age <= 30;
}));



//  2. _compact
var _compact = _filter(_identity);

console.log(_compact([1, 2, 0, false, null, {}]));

// 3. 찾아내기 - find

//  1. _find
var _find = _curryr(function(list, predi) {
  var keys = _keys(list);
  for(var i = 0, len = keys.length; i < len; i++) {
    var val = list[keys[i]];
    if (predi(val)) return val;
  }
});

//  2. _find_index
var _find_index = _curryr(function(list, predi) {
  var keys = _keys(list);
  for(var i = 0, len = keys.length; i < len; i++) {
    if (predi(list[keys[i]])) return i;
  }
  return -1;
});

_go(
  users,
  _find(function(user) { return user.id == 20 }),
  _get('name'),
  console.log
);

_go(
  users,
  _find_index(function(user) { return user.id == 20 }),
  console.log
);

//  3. _some
function _some(data, predi) {
  return _find_index(data, predi || _identity) != -1;
}

//  4. _every
function _every(data, predi) {
  return _find_index(data, _negate(predi || _identity)) == -1;
}

console.log(_some([1, 2, 5, 10, 20], function(val) { return val > 10 }));
console.log(_some([1, 2, 5, 10, 20], function(val) { return val > 20 }));

console.log(_every([1, 2, 5, 10, 20], function(val) { return val > 4 }));
console.log(_every([4, 6, 8, 12, 20], function(val) { return val > 3 }));

console.log(_some([1, 0, 3, 4]));
console.log(_some([1, false, 3, 4]));
console.log(_some([null, undefined, 0]));

console.log(_every([1, 2, 3, 4]));
console.log(_every([1, false, 3, 4]));
console.log(_every([null, undefined, 0]));

console.log(_some(users, user => user.age > 20));

// 4. 접기 - reduce

//  1. min, max, min_by, max_by

function _min(data) {
  return _reduce(data, function(a, b) {
    return a < b ? a : b;
  });
}

function _max(data) {
  return _reduce(data, function(a, b) {
    return a > b ? a : b;
  });
}
console.log(_min([1, 2, 4, 10, -4]));
console.log(_max([1, 2, 4, 10, -4]));

var _min_by = _curryr(function(data, iter) {
  return _reduce(data, function(a, b) {
    return iter(a) < iter(b) ? a : b; });
});

var _max_by = _curryr(function(data, iter) {
  return _reduce(data, function(a, b) {
    return iter(a) > iter(b) ? a : b;
  });
});

console.log(_min_by([1, 2, 4, 10, -4, -11], Math.abs));
console.log(_max_by([1, 2, 4, 10, -4, -11], Math.abs));

_go(
  users,
  _filter(user => user.age>30),
  _max_by(_get('age')),
  _get('name'),
  console.log
);

//  2. group_by, push


function _head(list) {
  return list[0];
}

function _push(obj, key, val) {
  (obj[key] = obj[key] || []).push(val);
  return obj;
}

var _group_by = _curryr(function(data, iter){
  return _reduce(data, function(grouped, val) {
    return _push(grouped, iter(val), val);
  }, {});
});

_go(users, _group_by(_get('age')), console.log);
// 연령대별 그루핑
_go(users, _group_by(user => user.age - user.age % 10), console.log);
// 이름의 첫 글자로 그루핑
_go(users, _group_by(_pipe(_get("name"), _head)), console.log);

//  3. count_by, inc

function _inc(obj, key) {
  obj[key] ? obj[key]++ : obj[key] = 1
  return obj;
}

var _count_by = _curryr(function(data, iter) {
  return _reduce(data, function(count, val) {
    return _inc(count, iter(val))
  }, {});
});


_go(users, _count_by(_get('age')), console.log);
_go(users, _count_by(user => user.age - user.age % 10), console.log);
_go(users, _count_by(_pipe(_get("name"), _head)), console.log);


var _pairs = _map((val, key) => [key, val])

console.clear();

// 실전 사용 예제

var f1 = _pipe(
  _count_by(user => user.age - user.age % 10),
  _map((count, key) => `<li>${key}대는 ${count}명 입니다</li>`),
  list => '<ul>' + list.join('') + '</ul>',
  console.log
);

f1(users);

var f2 = _pipe(
  _reject(user => user.age < 20),
  f1,
)

f2(users);
