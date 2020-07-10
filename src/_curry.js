// 1. _curry, _curryr
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

var add = _curry(function(a, b) {
  return a + b;
});

var sub = _curryr(function(a, b) {
  return a - b;
});

var add10 = add(10);
var add5 = add(5);

console.log(add10(5));
console.log(add5(5));
console.log(add(5)(3));
console.log(add(1, 2));

var sub5 = sub(5);
console.log(sub5(10));
console.log(sub(10, 5));
console.log(sub(10)(5));


// 2. _get (user가 null 인 경우 undefined)
// 보다 안전하게 사용할 수 있다.
function _get(obj, key) {
  return obj == null ? undefined : obj[key]
}

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

console.log(users[0].name);
// users[9] 가 존재 하지 않아서 error 발생
// console.log(users[9].name);

console.log( _get(users[0], 'name'))
console.log( _get(users[9], 'name'))

// _curryr을 _get에 적용해 코드를 간단하게 만들기
// 기존 _get(user, 'name')을 _curryr을 적용하여, _get(name)(user)로 변경한다.

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

console.log(_get('name')(users[0]));

console.log(
  _map(
    _filter(users, function(user) { return user.age >= 30 }),
    _get('name')
  )
);

console.log(
  _map(
    _filter(users, function(user) { return user.age < 30 }),
    _get('age')
  )
);
