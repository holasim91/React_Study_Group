import React from 'react';

export const BtnColorContext = React.createContext('red');
//React.createContext()를 사용해서 context 객체를 만들어서 export한다
// 만약 이 context를 구독했는데 Provider가 존재하지 않는다면 default 값(red)이 적용된다
