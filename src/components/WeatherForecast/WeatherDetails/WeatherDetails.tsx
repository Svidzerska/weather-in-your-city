import React, { useEffect, useState } from "react";

import "./weatherDetails.scss";

interface Props {
  item: any;
  index: number;
}

const WeatherDetails: React.FC<Props> = ({ item, index }): JSX.Element => {
  return (
    <>
      {(index === 0 || item?.time_value === "00:00") && (
        <ul className="forecastView_inDetails_Names">
          <li>Time</li>
          <li>Temperature</li>
          <li>Feels like</li>
          <li>Pressure, mm Hg</li>
          <li>Clouds</li>
          <li>Humidity, %</li>
          <li>Wind, m/s</li>
        </ul>
      )}
      <ul className="forecastView_inDetails">
        <li className="time">{item?.time_value}</li>
        <li className="temperature">{item?.temperature} &#176;C</li>
        <li className="temperature">{item?.feels_like} &#176;C</li>
        <li>{item?.pressure}</li>
        <li>{item?.clouds}</li>
        <li>{item?.humidity}</li>
        <li>{item?.wind_speed}</li>
      </ul>
    </>
  );
};

export default WeatherDetails;
