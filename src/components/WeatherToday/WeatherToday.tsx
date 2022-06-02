import React, { useEffect } from "react";

import "./weatherToday.scss";

import { backgroundChange } from "../../utilities/backgroundImage";
import { useAppSelector } from "../../app/hooks";

const WeatherToday: React.FC = (): JSX.Element => {
  const background = backgroundChange();

  const weatherToday: { data: any | null; isPending: boolean; error: any | null } = useAppSelector(
    (state) => state.weather.weatherToday
  );

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
