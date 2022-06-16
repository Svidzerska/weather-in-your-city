import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import "./buttonOpenMenu.scss";

import { setSearchMode } from "../../../features/weather/weatherSlice";

import { ReactComponent as BurgerMenuIcon } from "../../../images/svg/burgerMenuIcon.svg";

const ButtonOpenMenu: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <section className="burgerMenu">
      <button
        onClick={() => {
          dispatch(setSearchMode(true));
        }}
      >
        <i>
          <BurgerMenuIcon />
        </i>
      </button>
    </section>
  );
};

export default ButtonOpenMenu;
