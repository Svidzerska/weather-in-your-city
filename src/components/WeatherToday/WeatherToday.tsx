import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import "./weatherToday.scss";

import { backgroundChange } from "../../utilities/backgroundImage";

import { getWeatherToday } from "../../features/weather/weatherSlice";

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

  // useEffect(() => {
  //   console.log(cityCoordinates?.data);
  //   if (!cityCoordinates?.data) {
  //     let geo = navigator.geolocation;
  //     geo.getCurrentPosition(
  //       (pos) => {
  //         const coordinates = { lat: pos.coords.latitude, lon: pos.coords.longitude };
  //         console.log(pos.coords);
  //         dispatch(getWeatherToday(coordinates));
  //       },
  //       (err) => console.log(new Error())
  //     );
  //   }
  // }, []);

  return (
    <section className={`weatherToday ${background}`}>
      {weatherToday?.data !== null && !weatherToday?.isPending ? (
        <div>
          <h1>Today</h1>
          <h2 className="location">
            {weatherToday?.data?.name}, {lookup.byIso(weatherToday?.data?.sys?.country)?.country}
          </h2>
          <p className="clouds">{weatherToday?.data?.weather[0].main}</p>
          <p className="temperature">{Math.round(weatherToday?.data?.main?.temp)} &#176;C</p>
        </div>
      ) : (
        <>
          <p className="error">{cityCoordinates?.error}</p>
          <p className="error">{weatherToday?.error}</p>
        </>
      )}
    </section>
  );
};

export default WeatherToday;
