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
