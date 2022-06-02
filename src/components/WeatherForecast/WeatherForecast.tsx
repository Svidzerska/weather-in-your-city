import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";

import "./weatherForecast.scss";

import { getForecastFullInfo } from "../../utilities/forecastFullInfo";

const WeatherForecast: React.FC = (): JSX.Element => {
  const weatherForecast: { data: any | null; isPending: boolean; error: any | null } = useAppSelector(
    (state) => state.weather.weatherForecast
  );

  const [forecastFullInfo, setForecastFullInfo] = useState([]);

  useEffect(() => {
    console.log(weatherForecast);
    const forecastFullInfo = getForecastFullInfo(weatherForecast?.data?.list);
    setForecastFullInfo(forecastFullInfo);
  }, [weatherForecast]);

  const forecastView = forecastFullInfo?.map((item: any) => {
    return (
      <div className="forecastView_oneDay">
        {item?.time_value === "12:00" && (
          <>
            <p>{item?.day}</p>
            <p>
              <span>{item?.temperature}</span>
              <br />
              <span>{item?.clouds}</span>
            </p>
          </>
        )}
      </div>
    );
  });

  return <section className="forecastView">{forecastView}</section>;
};

export default WeatherForecast;
