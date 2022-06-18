import React, { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import "./weatherForecast.scss";

import { ReactComponent as CaretDownIcon } from "../../images/svg/caretDownIcon.svg";

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
  // const [forecastTwelve, setForecastTwelve] = useState<any>([]);
  const [currentDays, setCurrentDays] = useState<string[]>([]);
  const [isFullWeather, setFullWeather] = useState<boolean>(false);

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

    // isFullWeather && day === currentDay ? setShortWeather(false) : setShortWeather(true);
    // currentDays.includes(day) ? (isFullWeather ? setFullWeather(false) : setFullWeather(true)) : setFullWeather(true);
  };

  const forecastTwelve = forecastFullInfo?.filter((item: any) => item?.time_value === "12:00");
  console.log(forecastTwelve);

  const forecastView: (JSX.Element | null)[] = forecastFullInfo?.map((item: any, index: number) => {
    //any
    console.log(item?.day);
    // item?.time_value === "12:00" && setForecastTwelve([...forecastTwelve, item]);

    return item?.time_value === "12:00" ? (
      <WeatherShort item={item} clickMore={() => handleFullWeather(item?.day)} key={item?.day + index} />
    ) : null;

    // if (item?.time_value === "12:00" && !currentDays.includes(item?.day)) {
    //   return <WeatherShort item={item} clickMore={() => handleFullWeather(item?.day)} key={item?.day + index} />;
    // } else {
    //   return (
    //     <div key={item?.day + index}>
    //       {currentDays.includes(item?.day) && (
    //         <>
    //           {item?.time_value === "12:00" && (
    //             <WeatherShort item={item} clickMore={() => handleFullWeather(item?.day)} />
    //           )}
    //           <WeatherDetails item={item} index={index} />
    //         </>
    //       )}
    //     </div>
    //   );
    // }
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
