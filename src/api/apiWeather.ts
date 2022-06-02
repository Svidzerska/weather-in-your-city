async function try_catch(url: string) {
  try {
    const result = await fetch(url);
    const json = await result.json();
    return json;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export const apiWeather = {
  getCityCoordinates: (city: string) => {
    return try_catch(
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
        city +
        "&limit=1&lang=en&units=metric&appid=18403b04ed7c3c2c59d89a2a42ba33c0"
    );
  },
  getWeatherToday: (lat: number, lon: number) => {
    return try_catch(
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        lon +
        "&lang=en&units=metric&appid=18403b04ed7c3c2c59d89a2a42ba33c0"
    );
  },
  getWeatherForecast: (lat: number, lon: number) => {
    return try_catch(
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        lat +
        "&lon=" +
        lon +
        "&lang=en&units=metric&appid=18403b04ed7c3c2c59d89a2a42ba33c0"
    );
  },
};
