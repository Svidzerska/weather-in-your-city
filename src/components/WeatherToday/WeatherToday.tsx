import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import "./weatherToday.scss";

import { backgroundChange } from "../../utilities/backgroundImage";

import { getWeatherForecast, getWeatherToday, setSearchDone } from "../../features/weather/weatherSlice";

const WeatherToday: React.FC = (): JSX.Element => {
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

  const [coordinates, setCoordinates] = useState<{
    name: string;
    country: string;
    lat: number;
    lon: number;
  }>({
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

  useEffect(() => {
    !cityCoordinates?.data && dispatch(setSearchDone(true));
  }, []);

  return (
    <section className={`weatherToday ${background}`}>
      <CSSTransition
        in={isSearchDone}
        timeout={5000}
        classNames="forecastView"
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
