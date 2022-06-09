import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { SwitchTransition, Transition, TransitionGroup, TransitionStatus } from "react-transition-group";

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

// const duration = 500;

// const defaultStyle = {
//   transition: `opacity ${duration}ms ease-in-out,
//    color ${duration}ms ease-in-out`,
//   opacity: 0,
//   color: "red",
// };

// const transitionStyles: { [key: string]: object } = {
//   entering: { opacity: 0, color: "red" },
//   entered: { opacity: 1, color: "green" },
//   exiting: { opacity: 0, color: "blue" },
//   exited: { opacity: 0.6, color: "yellow" },
// };

// interface Props {
//   inProp: boolean;
// }

const Header: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const isSearchMode: boolean = useAppSelector((state) => state.weather.isSearchMode);
  const cityCoordinates: { data: any | null; isPending: boolean; error: any | null } = useAppSelector(
    (state) => state.weather.cityCoordinates
  );

  const [coordinates, setCoordinates] = useState<{ name: string; country: string; lat: number; lon: number }>({
    name: "",
    country: "",
    lat: 0,
    lon: 0,
  });

  useEffect(() => {
    cityCoordinates?.data &&
      setCoordinates({
        ...coordinates,
        name: cityCoordinates.data[0]?.name,
        country: cityCoordinates.data[0]?.country,
        lat: cityCoordinates.data[0]?.lat,
        lon: cityCoordinates.data[0]?.lon,
      });
  }, [cityCoordinates]);

  const handleSearch = (): void => {
    dispatch(getWeatherToday(coordinates));
    dispatch(getWeatherForecast(coordinates));
  };

  return (
    <header>
      {isSearchMode ? <SearchField handleSearch={handleSearch} coordinates={coordinates} /> : <ButtonOpenMenu />}
    </header>
  );
};

export default Header;
