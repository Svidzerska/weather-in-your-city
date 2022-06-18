import React, { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import "./weatherForecast.scss";

import { getForecastFullInfo } from "../../utilities/forecastFullInfo";
import { getWeatherForecast, setSearchDone } from "../../features/weather/weatherSlice";
import WeatherDetails from "./WeatherDetails/WeatherDetails";
import WeatherShort from "./WeatherShort/WeatherShort";

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
  const [currentDays, setCurrentDays] = useState<string[]>([]);

  useEffect(() => {
    const forecastFullInfo = getForecastFullInfo(weatherForecast?.data?.list);
    setForecastFullInfo(forecastFullInfo);
  }, [weatherForecast]);

  useEffect(() => {
    console.log(currentDays);
  }, [currentDays]);

  const handleFullWeather = (day: string): void => {
    console.log(day);
    currentDays.includes(day)
      ? setCurrentDays(() => currentDays.filter((item) => !(item === day)))
      : setCurrentDays(() => [...currentDays, day]);
  };

  const forecastTwelve = forecastFullInfo?.filter((item: any) => item?.time_value === "12:00");
  console.log(forecastTwelve);

  const forecastView: (JSX.Element | null)[] = forecastTwelve?.map((item: any, index: number) => {
    //any
    return (
      <li key={item?.day + index}>
        <WeatherShort item={item} clickMore={() => handleFullWeather(item?.day)} />
        {currentDays.includes(item?.day) && (
          <>
            {forecastFullInfo?.map((_item: any, _index: number) => {
              return (
                _item?.day === item?.day && <WeatherDetails item={_item} index={_index} key={_item?.day + _index} />
              );
            })}
          </>
        )}
      </li>
    );
  });

  return (
    <CSSTransition
      in={isSearchDone}
      timeout={2000}
      classNames="forecastView"
      onEnter={() => dispatch(getWeatherForecast(coordinates))}
      onExited={() => dispatch(getWeatherForecast(coordinates)).then(() => dispatch(setSearchDone(true)))}
    >
      <ul className="forecastView">{forecastView}</ul>
    </CSSTransition>
  );
};

export default WeatherForecast;
