/* first citizen function */

/* add_maker */
function add_maker(a) {
  return function(b) {
    return a + b;
  }
}

var add5 = add_maker(5);
var add10 = add_maker(10);
var add15 = add_maker(15);

console.log( add5(20) );
console.log( add10(20) );
console.log( add15(20) );

const f4 = (f1, f2, f3) => f3(f1() + f2());

console.log(
  f4(
    () => 2,
    () => 1,
    a => a * a
  )
);
