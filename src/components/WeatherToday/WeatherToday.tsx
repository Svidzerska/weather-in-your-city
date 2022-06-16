import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import "./weatherToday.scss";

import { backgroundChange } from "../../utilities/backgroundImage";

import { getWeatherToday, setSearchDone } from "../../features/weather/weatherSlice";

const duration = 500;

interface Props {
  coordinates: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
}

const WeatherToday: React.FC<Props> = ({ coordinates }): JSX.Element => {
  const dispatch = useAppDispatch();
  const background = backgroundChange();
  const lookup = require("country-code-lookup");

  const weatherToday: { data: any | null; isPending: boolean; error: any | null } = useAppSelector(
    (state) => state.weather.weatherToday
  );
  const cityCoordinates: { data: any | null; isPending: boolean; error: any | null } = useAppSelector(
    (state) => state.weather.cityCoordinates
  );
  const isSearchDone: boolean = useAppSelector((state) => state.weather.isSearchDone);

  useEffect(() => {
    !cityCoordinates?.data && dispatch(setSearchDone(true));
  }, []);

  return (
    <section className={`weatherToday ${background}`}>
      <CSSTransition
        in={isSearchDone}
        timeout={1000}
        classNames="weatherToday"
        appear
        onEnter={() => {
          console.log(coordinates);
          if (coordinates.lat === 0 && coordinates.lon === 0) {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                const coordinates = { lat: pos.coords.latitude, lon: pos.coords.longitude };
                console.log(pos.coords);
                dispatch(getWeatherToday(coordinates));
              },
              (err) => console.log(new Error())
            );
          } else {
            dispatch(getWeatherToday(coordinates));
          }
        }}
        onExited={() => dispatch(getWeatherToday(coordinates)).then(() => dispatch(setSearchDone(true)))}
      >
        {weatherToday?.data !== null && !weatherToday?.isPending ? (
          <div>
            <h1>Today</h1>
            <h2 className="location">
              {weatherToday?.data?.name},{" "}
              {weatherToday?.data?.sys?.country && lookup.byIso(weatherToday?.data?.sys?.country)?.country}
            </h2>
            <p className="clouds">{weatherToday?.data?.weather[0].main}</p>
            <p className="temperature">{Math.round(weatherToday?.data?.main?.temp)} &#176;C</p>
          </div>
        ) : (
          <div>
            <p className="error">{cityCoordinates?.error}</p>
            <p className="error">{weatherToday?.error}</p>
          </div>
        )}
      </CSSTransition>
    </section>
  );
};

export default WeatherToday;
