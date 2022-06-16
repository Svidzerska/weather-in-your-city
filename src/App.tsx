import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../src/app/hooks";

import "./App.scss";

import Header from "./components/Header/Header";
import WeatherForecast from "./components/WeatherForecast/WeatherForecast";
import WeatherToday from "./components/WeatherToday/WeatherToday";

const App: React.FC = (): JSX.Element => {
  const cityCoordinates: { data: any | null; isPending: boolean; error: any | null } = useAppSelector(
    (state) => state.weather.cityCoordinates
  );

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

  return (
    <>
      <Header />
      <main>
        <WeatherToday coordinates={coordinates} />
        <WeatherForecast coordinates={coordinates} />
      </main>
    </>
  );
};

export default App;
