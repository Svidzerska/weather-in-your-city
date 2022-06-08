import React, { useState } from "react";

import "./App.scss";

import Header from "./components/Header/Header";
import WeatherForecast from "./components/WeatherForecast/WeatherForecast";
import WeatherToday from "./components/WeatherToday/WeatherToday";
import Fade from "./TempComponent";

const App: React.FC = (): JSX.Element => {
  const [inProp, setInProp] = useState(false);

  return (
    <>
      <Header />
      <main>
        <WeatherToday />
        <WeatherForecast />
        <Fade inProp={inProp} />
        <button onClick={() => setInProp(true)}>Click to Enter</button>
        <button onClick={() => setInProp(false)}>Click to Exit</button>
      </main>
    </>
  );
};

export default App;
