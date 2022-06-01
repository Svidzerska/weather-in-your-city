import React from "react";

import "./weatherToday.scss";

import { backgroundChange } from "../../utilities/backgroundImage";

const WeatherToday: React.FC = (): JSX.Element => {
  const background = backgroundChange();
  return (
    <section className={`weatherToday ${background}`}>
      <p>Today weather here</p>
    </section>
  );
};

export default WeatherToday;
