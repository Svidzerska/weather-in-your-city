import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import "./header.scss";

import ButtonOpenMenu from "./buttonOpenMenu/ButtonOpenMenu";
import SearchField from "./searchField/SearchField";
import { TransitionGroup } from "react-transition-group";

const Header: React.FC = (): JSX.Element => {
  const isSearchMode: boolean = useAppSelector((state) => state.weather.isSearchMode);

  return (
    <header>
      <TransitionGroup>{isSearchMode ? <SearchField /> : <ButtonOpenMenu />}</TransitionGroup>
    </header>
  );
};

export default Header;
