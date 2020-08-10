# 컨텍스트 API(Context API)
리액트는 기본적으로 단방향흐름을 지향한다.  
 따라서 최상위 컴포넌트에서 최하위 컴포넌트로 데이터를 전달하려면 중간중간에 있는 컴포넌트를 다 거쳐야한다.  
그러나 컨텍스트는 부모와 자식이 연결되어 있지 않아도 데이터를 공유할 수 있게 해준다.  

예를들어,
App 컴포넌트 하위에 Header 컴포넌트, 그리고 Header 컴포넌트 하위에 Button 컴포넌트가 있다고 생각해보자.
![image](https://user-images.githubusercontent.com/46669567/89795065-e5fc0c00-db62-11ea-8380-453a4d7a9980.png)


**App.js**
```js
import React from 'react';
import Header from './Header';

function App() {
  return (
    < >
      <Header BtnColor = 'yellow' /> 
      {/* 헤더에게 버튼 색상 전달 */}
    </>
  );
}

export default App;
```

**Header.js**
```js
import React from "react";
import Button from "./Button";

const Header = (props) => {
  return (
    <header>
      <h1>Title</h1>
      {console.log(props.BtnColor)}
      <Button BtnColor={props.BtnColor} />
      {/* 부모로부터 전달 받은 버튼의 색상을 버튼에게 전달 */}
    </header>
  );
};

export default Header;

```

**Button.js**
```js
import React from 'react'

const Button = (props) => {
    return (
        <button type='button' style={{background:props.BtnColor}}>
            Button
        </button>
        // 부모가 전달한 버튼의 색상을 헤더를 거쳐 받음
    )
}

export default Button

```
* * *
보다시피 Header컴포넌트는 아무런 관련도 없는 데이터를 다른 컴포넌트에 넘겨주고 있다.  
이러한 불필요한 행위를 **Context API**를 사용해 줄여보자

**context.js**
```js
import React from 'react';

export const BtnColorContext = React.createContext('red');
//React.createContext()를 사용해서 context 객체를 만들어서 export한다
// 만약 이 context를 구독했는데 Provider가 존재하지 않는다면 default 값(red)이 적용된다
```


**App.js**
```js
import React from 'react';
import Header from './Header';
import { BtnColorContext } from './context';

function App() {
  return (
    <BtnColorContext.Provider value="yellow">
      <Header /> 
    </BtnColorContext.Provider>
    //최상위 컴포넌트에서 Context객체를 임포트하고 Provider로 감싸주고,
    //하위 컴포넌트에게 전달할 데이터를 입력한다
  );
}

export default App;
```

**Header.js**
```js
import React from "react";
import Button from "./Button";

const Header = () => {
  return (
    <header>
      <h1>Title</h1>
      <Button/>
      {/* 이제 이 곳은 전달할 데이터가 없으니 비워놓는다 */}
    </header>
  );
};

export default Header;
```

**Button.js**
```js
import React, { useContext } from 'react'
import { BtnColorContext } from './context'


const Button = () => {
    const BtnColor = useContext(BtnColorContext)
    return (
        <button type='button' style={{backgroundColor:BtnColor}}>
            Button
        </button>
        // App 컴포넌트에서 생성한 Context object를 import한 후,
        //useContext()를 사용하여 value값을 가지고 올 수 있다.

    )
}

export default Button
```
 



