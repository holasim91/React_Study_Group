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
