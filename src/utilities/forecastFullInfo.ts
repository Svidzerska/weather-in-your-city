import { ForecastFullInfo } from "../interfaces/ForecastFullInfo";
import { ForecastList } from "../interfaces/ForecastList";

const d2d = require("degrees-to-direction");

export const getForecastFullInfo = (forecastTimeList: ForecastList[]) => {
  const forecastFullInfo: ForecastFullInfo[] = forecastTimeList?.map((unixTimeWeather: ForecastList) => {
    const a: Date = new Date(unixTimeWeather.dt * 1000);
    const months: string[] = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const year: number = a.getFullYear();
    const month: string = months[a.getMonth()];
    const date: number = a.getDate();
    const days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day: string = days[a.getDay()];

    const fullDate: string = date + " " + month + " " + year + " " + day;

    const hour: string | number = a.getHours() <= 9 ? "0" + a.getHours() : a.getHours();
    const min: string | number = a.getMinutes() <= 9 ? "0" + a.getMinutes() : a.getMinutes();
    const time: string = hour + ":" + min;

    return {
      date_value: fullDate,
      time_value: time,
      day: day,
      temperature: Math.round(unixTimeWeather?.main?.temp),
      feels_like: Math.round(unixTimeWeather?.main?.feels_like),
      pressure: Math.round(unixTimeWeather?.main?.pressure * 0.75006),
      humidity: unixTimeWeather?.main?.humidity,
      clouds: unixTimeWeather?.weather[0].description,
      icon: unixTimeWeather?.weather[0].icon,
      wind_speed: Math.round(unixTimeWeather?.wind?.speed),
      gust: unixTimeWeather?.wind?.gust,
      wind_direction: d2d(unixTimeWeather?.wind?.deg),
    };
  });
  return forecastFullInfo;
};
