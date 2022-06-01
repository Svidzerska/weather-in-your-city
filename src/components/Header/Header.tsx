import React from "react";

import "./header.scss";

import { ReactComponent as BurgerMenuIcon } from "../../images/svg/burgerMenuIcon.svg";

const Header: React.FC = (): JSX.Element => {
  return (
    <header>
      <button className="burgerMenu">
        <i>
          <BurgerMenuIcon />
        </i>
      </button>
    </header>
  );
};

export default Header;
