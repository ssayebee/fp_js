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

function _is_obj(obj) {
  return typeof obj == 'object' && !!obj;
}

function _keys(obj) {
  return _is_obj(obj) ? Object.keys(obj) : [];
}

var _values = _map(_identity);
function _identity(val) {
  return val;
}

function _plunk(data, key) {
  return _map(data, _get(key));
}

function _negate(fun) {
  return function(val) {
    return !fun(val);
  }
};

function _reject(data, predi) {
  return _filter(data, _negate(predi));
}

var _compact = _filter(_identity);

var _find = _curryr(function(list, predi) {
  var keys = _keys(list);
  for(var i = 0, len = keys.length; i < len; i++) {
    var val = list[keys[i]];
    if (predi(val)) return val;
  }
});

var _find_index = _curryr(function(list, predi) {
  var keys = _keys(list);
  for(var i = 0, len = keys.length; i < len; i++) {
    if (predi(list[keys[i]])) return i;
  }
  return -1;
});

function _some(data, predi) {
  return _find_index(data, predi || _identity) != -1;
}

function _every(data, predi) {
  return _find_index(data, _negate(predi || _identity)) == -1;
}
