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

// 1. 명령형 코드
  // 1. 30세 이상인 users를 거른다.

var temp_users = [];
for(var i = 0; i < users.length; i++) {
  if(users[i].age >= 30) {
    temp_users.push(users[i]);
  }
}
console.log(temp_users);

  // 2. 30세 이상인 users의 names를 수집한다.

names = []
for(var i = 0; i < temp_users.length; i++) {
  names.push(temp_users[i].name);
}
console.log(names);

  // 3. 30세 미만인 users를 거른다.

var temp_users = [];
for(var i = 0; i < users.length; i++) {
  if(users[i].age < 30) {
    temp_users.push(users[i]);
  }
}
console.log(temp_users);

  // 4. 30세 미만인 users의 ages를 수집한다.

ages = []
for(var i = 0; i < temp_users.length; i++) {
  ages.push(temp_users[i].age);
}
console.log(ages);

// 1. __filter, _map으로 리팩토링
/*
 * filter(응용형 함수)
 * 함수가 함수를 받아서 원하는 시점에 해당하는 함수가 알고 있는 인자를 적용
*/

function _filter(list, predi) {
  var new_list = [];
  for(var i = 0; i < list.length; i++) {
    if(predi(list[i])) {
      new_list.push(list[i]);
    }
  }
  return new_list;
}

function _map(list, mapper) {
  var new_list = [];
  for(var i = 0; i < list.length; i++) {
    new_list.push(mapper(list[i]));
  }
  return new_list;
}

var over_30 = _filter(users, (user) => user.age >= 30 );
var under_30 = _filter(users, (user) => user.age < 30 );

console.log(over_30);
console.log(under_30);

console.log(
  _filter([1, 2, 3, 4], num => num%2));
console.log(
  _filter([1, 2, 3, 4], num => !(num%2)));

console.log(_map(over_30, user => user.name));
console.log(_map(under_30, user => user.age));

console.log(
  _map([1, 2, 3], num => num * 2));

// 대입문을 제거하고, 보다 안전하게 변경
console.log(
_map(
  _filter(users, user => user.age >= 30),
  user => user.name )
);

console.log(
_map(
  _filter(users, user => user.age < 30),
  user => user.age )
);
