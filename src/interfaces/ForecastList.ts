export interface ForecastList {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  weather: { description: string; icon: string }[];
  wind: { speed: number; gust: number; deg: number };
}
