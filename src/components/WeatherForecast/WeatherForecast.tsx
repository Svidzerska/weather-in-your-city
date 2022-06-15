import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";

import "./weatherForecast.scss";

import { ReactComponent as CaretDownIcon } from "../../images/svg/caretDownIcon.svg";

import { getForecastFullInfo } from "../../utilities/forecastFullInfo";

const WeatherForecast: React.FC = (): JSX.Element => {
  const weatherForecast: { data: any | null; isPending: boolean; error: any | null } = useAppSelector(
    (state) => state.weather.weatherForecast
  );

  const [forecastFullInfo, setForecastFullInfo] = useState([]);
  const [currentDay, setCurrentDay] = useState<string>("");
  const [isFullWeather, setFullWeather] = useState<boolean>(false);

  useEffect(() => {
    const forecastFullInfo = getForecastFullInfo(weatherForecast?.data?.list);
    setForecastFullInfo(forecastFullInfo);
  }, [weatherForecast]);

  useEffect(() => {}, []);

  const handleFullWeather = (day: string): void => {
    console.log(day);
    setCurrentDay(day);
    isFullWeather && day === currentDay ? setFullWeather(false) : setFullWeather(true);
  };

  const forecastDetails: (JSX.Element | null)[] = forecastFullInfo?.map((item: any) => {
    if (item?.day === currentDay) {
      return (
        <div className="forecastView_inDetails" key={item?.day}>
          <p className="time">{item?.time_value}</p>
          <p className="temperature">{item?.temperature} &#176;C</p>
          <p className="temperature">{item?.feels_like} &#176;C</p>
          <p>{item?.pressure}</p>
          <p>{item?.clouds}</p>
          <p>{item?.humidity}</p>
          <p>{item?.wind_speed}</p>
        </div>
      );
    } else {
      return null;
    }
  });

  const forecastView: (JSX.Element | null)[] = forecastFullInfo?.map((item: any) => {
    if (item?.time_value === "12:00") {
      return (
        <div className="forecastView_oneDay" key={item?.day}>
          <button onClick={() => handleFullWeather(item?.day)}>
            <i>
              <CaretDownIcon />
            </i>
            <span>{item?.day}</span>
          </button>
          <p>
            <span>{item?.temperature} &#176;C</span>
            <br />
            <span>{item?.clouds}</span>
          </p>
          {item?.day === currentDay && isFullWeather && (
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
          {item?.day === currentDay && isFullWeather && forecastDetails}
        </div>
      );
    } else {
      return null;
    }
  });

  return <section className="forecastView">{forecastView}</section>;
};

export default WeatherForecast;
