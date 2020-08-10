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
