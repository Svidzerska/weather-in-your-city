import React, { useEffect, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import "./header.scss";

import ButtonOpenMenu from "./buttonOpenMenu/ButtonOpenMenu";
import SearchField from "./searchField/SearchField";

const duration = 500;

const Header: React.FC = (): JSX.Element => {
  const isSearchMode: boolean = useAppSelector((state) => state.weather.isSearchMode);

  return (
    <header>
      <SwitchTransition mode={"out-in"}>
        <CSSTransition
          key={isSearchMode ? "searchField" : "menu"}
          timeout={duration}
          classNames={isSearchMode ? "search" : "burgerMenu"}
        >
          {isSearchMode ? <SearchField /> : <ButtonOpenMenu />}
        </CSSTransition>
      </SwitchTransition>
    </header>
  );
};

export default Header;
