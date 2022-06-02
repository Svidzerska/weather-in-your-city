import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import "./weatherToday.scss";

import { backgroundChange } from "../../utilities/backgroundImage";

import { getWeatherToday } from "../../features/weather/weatherSlice";
import { AsyncThunkAction } from "@reduxjs/toolkit";

const WeatherToday: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const background = backgroundChange();

  const weatherToday: { data: any | null; isPending: boolean; error: any | null } = useAppSelector(
    (state) => state.weather.weatherToday
  );

  useEffect(() => {
    let geo = navigator.geolocation;
    console.log(geo);
    let id = geo.watchPosition(
      (pos) => {
        const coordinates = { lat: pos.coords.latitude, lon: pos.coords.longitude };
        console.log(pos.coords);
        dispatch(getWeatherToday(coordinates));
        geo.clearWatch(id);
      },
      (err) => console.log(new Error())
    );
  }, []);

  useEffect(() => {
    console.log(weatherToday);
  }, [weatherToday]);

  return (
    <section className={`weatherToday ${background}`}>
      <div>
        <h1>Today</h1>
        <h2 className="location">
          {weatherToday?.data?.name}, {weatherToday?.data?.sys?.country}
        </h2>
        <p className="clouds">{weatherToday?.data?.weather[0].main}</p>
        <p className="temperature">{Math.round(weatherToday?.data?.main?.temp)} &#176;C</p>
      </div>
    </section>
  );
};

export default WeatherToday;
