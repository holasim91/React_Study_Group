# 컨텍스트 API(Context API)
리액트는 기본적으로 단방향흐름을 지향한다. 따라서 최상위 컴포넌트에서 최하위 컴포넌트로 데이터를 전달하려면 중간중간에 있는 컴포넌트를 다 거쳐야한다.  
그러나 컨텍스트는 부모와 자식이 연결되어 있지 않아도 데이터를 공유할 수 있게 해준다.  

예를들어,
App 컴포넌트 하위에 Header 컴포넌트, 그리고 Header 컴포넌트 하위에 Button 컴포넌트가 있다고 생각해보자.

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


 



