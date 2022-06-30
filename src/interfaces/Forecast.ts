import { ForecastList } from "./ForecastList";

export interface Forecast {
  city: { name: string; country: string };
  list: ForecastList[];
}
