import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import "./weatherForecast.scss";

import { ReactComponent as CaretDownIcon } from "../../images/svg/caretDownIcon.svg";

import { getForecastFullInfo } from "../../utilities/forecastFullInfo";
import { getWeatherForecast, setSearchDone } from "../../features/weather/weatherSlice";

const duration = 500;

interface Props {
  coordinates: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
}

const WeatherForecast: React.FC<Props> = ({ coordinates }): JSX.Element => {
  const dispatch = useAppDispatch();

  const weatherForecast: { data: any | null; isPending: boolean; error: any | null } = useAppSelector(
    (state) => state.weather.weatherForecast
  );
  const isSearchDone: boolean = useAppSelector((state) => state.weather.isSearchDone);

  const [forecastFullInfo, setForecastFullInfo] = useState([]);
  const [currentDay, setCurrentDay] = useState<string>("");
  const [isFullWeather, setFullWeather] = useState<boolean>(false);

  useEffect(() => {
    const forecastFullInfo = getForecastFullInfo(weatherForecast?.data?.list);
    setForecastFullInfo(forecastFullInfo);
  }, [weatherForecast]);

  useEffect(() => {
    console.log(isSearchDone);
  }, [isSearchDone]);

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

  return (
    <CSSTransition
      in={isSearchDone}
      timeout={2000}
      classNames="forecastView"
      onEnter={() => dispatch(getWeatherForecast(coordinates))}
      onExited={() => dispatch(getWeatherForecast(coordinates)).then(() => dispatch(setSearchDone(true)))}
    >
      <section className="forecastView">{forecastView}</section>
    </CSSTransition>
  );
};

export default WeatherForecast;
