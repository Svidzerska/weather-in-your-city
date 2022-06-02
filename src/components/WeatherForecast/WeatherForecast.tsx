import React, { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";

const WeatherForecast: React.FC = (): JSX.Element => {
  const weatherForecast: { data: any | null; isPending: boolean; error: any | null } = useAppSelector(
    (state) => state.weather.weatherForecast
  );

  useEffect(() => {
    console.log(weatherForecast);
  }, [weatherForecast]);

  return (
    <section className="">
      <p>Weather forecast here</p>
    </section>
  );
};

export default WeatherForecast;
