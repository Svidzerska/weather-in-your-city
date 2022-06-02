import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import "./header.scss";

import { ReactComponent as BurgerMenuIcon } from "../../images/svg/burgerMenuIcon.svg";
import { ReactComponent as CancelIcon } from "../../images/svg/xmarkIcon.svg";

import {
  getCityCoordinates,
  getWeatherForecast,
  getWeatherToday,
  setSearchMode,
} from "../../features/weather/weatherSlice";

const Header: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const lookup = require("country-code-lookup");

  const isSearchMode: boolean = useAppSelector((state) => state.weather.isSearchMode);
  const cityCoordinates: { data: any | null; isPending: boolean; error: any | null } = useAppSelector(
    (state) => state.weather.cityCoordinates
  );

  const [value, setValue] = useState<string>("");
  const [coordinates, setCoordinates] = useState<{ name: string; country: string; lat: number; lon: number }>({
    name: "",
    country: "",
    lat: 0,
    lon: 0,
  });

  useEffect(() => {
    console.log(cityCoordinates);
    cityCoordinates?.data &&
      setCoordinates({
        ...coordinates,
        name: cityCoordinates.data[0]?.name,
        country: cityCoordinates.data[0]?.country,
        lat: cityCoordinates.data[0]?.lat,
        lon: cityCoordinates.data[0]?.lon,
      });
  }, [cityCoordinates]);

  useEffect(() => {
    console.log(value);
    dispatch(getCityCoordinates(value));
  }, [value]);

  const handleInput = (e: React.FormEvent<HTMLInputElement>): void => {
    setValue(e.currentTarget.value);
  };

  const handleSearch = (): void => {
    dispatch(getWeatherToday(coordinates));
    dispatch(getWeatherForecast(coordinates));
  };

  return (
    <header>
      {isSearchMode ? (
        <section className="searchModeSection">
          <p>
            <input onChange={handleInput} type="text" value={value} />
            <button onClick={handleSearch} disabled={!(!!coordinates.country && coordinates.country !== "")}>
              <i>Search</i>
            </button>
          </p>
          <button onClick={() => dispatch(setSearchMode(false))}>
            <i>
              <CancelIcon />
            </i>
          </button>
          <p className="searchCityCountry">
            {coordinates.name}
            <br />
            {coordinates.country && lookup.byIso(coordinates.country)?.country}
          </p>
        </section>
      ) : (
        <button className="burgerMenu" onClick={() => dispatch(setSearchMode(true))}>
          <i>
            <BurgerMenuIcon />
          </i>
        </button>
      )}
    </header>
  );
};

export default Header;
