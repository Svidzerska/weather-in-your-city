import React, { useEffect, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import "./weatherForecast.scss";

import { getForecastFullInfo } from "../../utilities/forecastFullInfo";
import { getWeatherForecast, setSearchDone, setAdditionInfo } from "../../features/weather/weatherSlice";

import { Forecast } from "../../interfaces/Forecast";
import { ForecastFullInfo } from "../../interfaces/ForecastFullInfo";

import WeatherDetails from "./WeatherDetails/WeatherDetails";
import WeatherShort from "./WeatherShort/WeatherShort";

const duration = 1000;

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

  const weatherForecast: { data: Forecast | null; isPending: boolean; error: any | null } = useAppSelector(
    (state) => state.weather.weatherForecast
  );
  const isSearchDone: boolean = useAppSelector((state) => state.weather.isSearchDone);
  const isAdditionInfo: string[] = useAppSelector((state) => state.weather.isAdditionInfo);

  const [forecastFullInfo, setForecastFullInfo] = useState<ForecastFullInfo[]>([]);
  const [currentDays, setCurrentDays] = useState<string[]>([]);

  useEffect(() => {
    if (weatherForecast?.data?.list) {
      const forecastFullInfo = getForecastFullInfo(weatherForecast?.data?.list);
      setForecastFullInfo(forecastFullInfo);
    }
  }, [weatherForecast]);

  const handleFullWeather = (day: string): void => {
    currentDays.includes(day)
      ? setCurrentDays(() => currentDays.filter((item) => !(item === day)))
      : setCurrentDays(() => [...currentDays, day]);
  };

  const showAdditionInfo = (day: string): void => {
    console.log(day);
    isAdditionInfo.includes(day)
      ? dispatch(setAdditionInfo(isAdditionInfo.filter((item) => !(item === day))))
      : dispatch(setAdditionInfo([...isAdditionInfo, day]));
  };

  const forecastTwelve = forecastFullInfo?.filter((item: ForecastFullInfo) => item?.time_value === "12:00");

  const forecastView: (JSX.Element | null)[] = forecastTwelve?.map((item: ForecastFullInfo, index: number) => {
    return (
      <li key={item?.day + index}>
        <WeatherShort item={item} clickMore={() => handleFullWeather(item?.day)} />
        <CSSTransition
          in={currentDays.includes(item?.day)}
          timeout={duration}
          classNames="forecastView_inDetails_block"
          unmountOnExit
        >
          <div className="forecastView_inDetails_block">
            <div>
              {forecastFullInfo?.map((_item: ForecastFullInfo, _index: number) => {
                return (
                  _item?.day === item?.day && <WeatherDetails item={_item} index={_index} key={_item?.day + _index} />
                );
              })}
            </div>
            <SwitchTransition mode={"out-in"}>
              <CSSTransition
                key={isAdditionInfo.includes(item?.day) ? "additionInfo" : "temperatureInfo"}
                timeout={duration}
                classNames={isAdditionInfo.includes(item?.day) ? "additionInfo" : "temperatureInfo"}
              >
                <button onClick={() => showAdditionInfo(item?.day)}>
                  {isAdditionInfo.includes(item?.day) ? "Less" : "More"}
                </button>
              </CSSTransition>
            </SwitchTransition>
          </div>
        </CSSTransition>
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
