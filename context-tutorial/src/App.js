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
