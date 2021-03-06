const multiply = (a,b) => a * b
const add = (a,b) => a + b

const multiplyX = x => a => multiply(a, x)
const addX = x => a => add(x,a)

// const addFour = addX(4)
// const multiplyTwo = multiplyX(2)
// const multiplyThree = multiplyX(3)
// const formular = x => addFour(multiplyThree(multiplyTwo(x)))
// const formular2 = x => addFour(multiplyThree(multiplyTwo(x)))

// console.log(formular(10)) // 64

function compose(...args) {
  return args.reduce( function (prevFunc, nextFunc) {
      return function (...values) {
        return nextFunc(prevFunc(...values));
      };
    },
    (k) => k);
}

const formular = compose(multiplyX(2), multiplyX(3), addX(4));
console.log(formular(10)) //64
