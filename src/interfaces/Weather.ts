export interface Weather {
  name: string;
  sys: { country: string };
  weather: { main: string }[];
  main: { temp: number };
}
