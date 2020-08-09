# 리액트 고오급 기술 따라하기
## 1. 하이오더 컴포넌트 (HighOrder Component HOC)
###  1-1 커링(Currying)

나는 이미 4장에서 withStyles()로 커링을 사용했었다(?!).  
커링은 *** 반환값이 함수인 디자인 패턴을 말하며, 중복된 코드를 반복하지 않고 원하는 기능을 조합하여 적재적소에 사용할 수 있다 ***는 장점이 있다.

EX)
```js
                function multiply(a,b){
                    return a*b
                }
// 위의 코드는 두 인자를 곱하여 반환한다. 이 함수를 다시 활용해서..

                function multiplyTwo(a){
                    return multiply(a,2)
                }
/* 위의 함수는 multiply()의 함수를 재활용하여 a에 2를 곱한 값을 반환한다.
이를 응용하면 n배 함수를 생성시켜주는 커링 함수를 만들 수 있다! */

                function multiplyX(x){
                    return function(a){
                        return multiply(a,x)
                    }
                }
               // 이걸 화살표 함수로 바꿔서 표현하면..
                const multiplyX = x => a => multiply(a,x)

/* multiplyX() 함수는 인자 x를 받아 이름 없는 함수를 반환하고, 
이름 없는 함수는 다시 인자 a를 받아 multply(a, x)를 실행한 값을 반환한다.
즉 인자를 나눠 받아 함수를 실행하는 구성. */

                const multiplyThree = multiplyX(4)
                const result = multiplyThree(3) // 3 * 4 = 12
/*    처음에 multiplyX() 함수에 4를 받아서 multiplyThree변수에 할당하고,
 그 변수에 들어있는 함수는 인자 a에 3을 받아서 multply(4, 3)을 실행한 값을 출력한다. */

            //중간에 있는 함수 선언을 건너뛰고 결괏값을 얻을 수도 있다.
            const result = multiplyX(4)(3)
```               
여기서 다시 한 번 상기하자..
커링의 장점은 **인자를 나누어 받을 수 있다!!** 는 것을..!

EX 2)
((x*a)*b)+c 
(입력된 x에 a,b를 차례대로 곱한 후 c를 더하라)
이 수학식을 커링으로 구현을 해보면...
``` js

                const equation = (a,b,c) => x => ((x * a) * b) + c
                const formular = equation(2, 3, 4)
                const result = formular(10) 
                // 혹은
                const result = equation(10)(2,3,4)

               // 커링을 잘 응용하면 연산자를 최소하여 함수들의 조합만으로 구현이 가능하다.
                
                const multiply = (a,b) => a * b
                const add = (a,b) => a + b

                const multiplyX = x => a => multiply(a, x) //책에 오타남
                const addX = x => a => add(x,a)

                const addFour = addX(4)
                const multiplyTwo = multiplyX(2)
                const multiplyThree = multiplyX(3)
                const formular = x => addFour(multiplyThree(multiplyTwo(x)))     
```                
그러나, `const formular = x => addFour(multiplyThree(multiplyTwo(x)))` 
이 함수는 적용순서가 오른쪽에서 왼쪽 방향이어서 사람이 단 번에 이해하긴 어렵다.  
즉 코드의 가독성이 떨어진다는 소리!  
그래서 이러한 실수를 한기 위해 커링 함수를 조합하는 `compose()`함수를 만들면 된다!  
reduce()를 사용하면 함수를 조합하는 함수를 만들 수 있다.(reduce의 목적은 배열을 원하는 형태로 변경하는 것이다!)

``` js
    // 1.
    //배열로 전달할 커링 함수들을 하나로 조합하기위해 구성한 함수
    [multiplyTwo, multiplyThree, addFour].reduce(
        function(prevFunc, nextFunc){ //prevFunc는 이전 반환된 함수 nextFunc는 현재 배열 순환 순서인 함수
        return function(value){
            return nextFunc(prevFunc(value))
        }     
    }, function(k) return{k}) //function(k) return{k}는 reduce()의 초깃값이다.
```
이것을 단계적으로 분석하자면..
```js
// 1. 초깃값과 multiplyTwo()함수의 조합
    function(value){
        return multiplyTwo((k => k)(value))
    }


// 2. 1의 결괏값과  multiplyThree()함수의 조합
    function(value){
        return multiplyThree(
            function(value){
                return multiplyTwo(
                    (k => k)(value)
                )   
            }(value)
        )
    }


// 3. 2의 결괏값과  addFour()함수의 조합
    function(value){
        return addFour(
            function(value){
                return multiplyThree(
                    function(value){
                        return multiplyTwo(
                            (k => k)(value)
                        )
                    }(value)
                )
            }(value)
        )
    }


 //최종
 function compose(funcArr){
     return funcArr.reduec(
         function(prevFunc, nextFunc){
             return function(value){
                 return next(prevFunc(value))
             }
         },
         function(k) {return k}
     )
 }
 

 const formularWithCompose = compose([multiplyTwo, multiplyThree, addFour])

```

이것을 좀 더 응용하면...

```js
    function compose(...args){
        return args.reduce(function(prevFunc, nextFunc){
            return function(...values){
                return prevFunc(...values)
            }
        }, k => k)
    }

    const formular = compose(multiplyX(2), multiplyX(3), addX(4))
```
참고로 오픈소스로 많은 라이브러리에 포함되어있기 때문에 그냥 갖다쓰면 된다. 
















                