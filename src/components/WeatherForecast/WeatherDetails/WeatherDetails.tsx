import React, { useEffect, useState } from "react";

import "./weatherDetails.scss";

interface Props {
  item: any;
  index: number;
}

const WeatherDetails: React.FC<Props> = ({ item, index }): JSX.Element => {
  console.log(item, index);

  return (
    <>
      {(index === 0 || item?.time_value === "00:00") && (
        <div className="forecastView_inDetails_Names">
          <p>Time</p>
          <p>Temperature</p>
          <p>Feels like</p>
          <p>Pressure, mm Hg</p>
          <p>Clouds</p>
          <p>Humidity, %</p>
          <p>Wind, m/s</p>
        </div>
      )}
      <div className="forecastView_inDetails">
        <p className="time">{item?.time_value}</p>
        <p className="temperature">{item?.temperature} &#176;C</p>
        <p className="temperature">{item?.feels_like} &#176;C</p>
        <p>{item?.pressure}</p>
        <p>{item?.clouds}</p>
        <p>{item?.humidity}</p>
        <p>{item?.wind_speed}</p>
      </div>
    </>
  );
};

export default WeatherDetails;
