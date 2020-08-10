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
