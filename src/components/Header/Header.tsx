import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { SwitchTransition, CSSTransition, TransitionGroup, TransitionStatus } from "react-transition-group";

import "./header.scss";

import { ReactComponent as BurgerMenuIcon } from "../../images/svg/burgerMenuIcon.svg";

import {
  getCityCoordinates,
  getWeatherForecast,
  getWeatherToday,
  setSearchMode,
} from "../../features/weather/weatherSlice";
import ButtonOpenMenu from "./buttonOpenMenu/ButtonOpenMenu";
import SearchField from "./searchField/SearchField";

const Header: React.FC = (): JSX.Element => {
  const isSearchMode: boolean = useAppSelector((state) => state.weather.isSearchMode);

  return <header>{isSearchMode ? <SearchField /> : <ButtonOpenMenu />}</header>;
};

export default Header;
