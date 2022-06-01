import React from "react";

import "./App.css";

import Header from "./components/Header/Header";
import WeatherForecast from "./components/WeatherForecast/WeatherForecast";
import WeatherToday from "./components/WeatherToday/WeatherToday";

const App: React.FC = (): JSX.Element => {
  return (
    <>
      <Header />
      <main>
        <WeatherToday />
        <WeatherForecast />
      </main>
    </>
  );
};

export default App;
