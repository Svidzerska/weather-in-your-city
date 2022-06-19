import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { apiWeather } from "../../api/apiWeather";

import { Coordinates } from "../../interfaces/Coordinates";
import { Weather } from "../../interfaces/Weather";

interface InitialState {
  isSearchMode: boolean;
  cityCoordinates: { data: Coordinates[] | null; isPending: boolean; error: any | null };
  weatherToday: { data: Weather | null; isPending: boolean; error: any | null };
  weatherForecast: { data: any | null; isPending: boolean; error: any | null };
  isSearchDone: boolean;
  isNextSearch: boolean;
}

interface Data {
  data: any;
}

const initialState: InitialState = {
  isSearchMode: false,
  cityCoordinates: { data: null, isPending: false, error: null },
  weatherToday: { data: null, isPending: false, error: null },
  weatherForecast: { data: null, isPending: false, error: null },
  isSearchDone: false,
  isNextSearch: true,
};

export const getCityCoordinates = createAsyncThunk<Coordinates[], string>(
  "cityCoordinates/getCityCoordinates",
  async (city: string) => {
    return apiWeather.getCityCoordinates(city)?.then((data: Coordinates[]) => {
      return data; //payload - data
    }) as Promise<Coordinates[]>;
  }
);

export const getWeatherToday = createAsyncThunk<Weather, { lat: number; lon: number }>(
  "weatherToday/getWeatherToday",
  async (coordinates) => {
    const { lat, lon } = coordinates;
    return apiWeather.getWeatherToday(lat, lon)?.then((data: Weather) => {
      console.log(data);
      return data; //payload - data
    }) as Promise<Weather>;
  }
);

export const getWeatherForecast = createAsyncThunk<Data, { lat: number; lon: number }>(
  "weatherForecast/getWeatherForecast",
  async (coordinates) => {
    const { lat, lon } = coordinates;
    return apiWeather.getWeatherForecast(lat, lon)?.then((data) => {
      return data; //payload - data
    }) as Promise<Data>;
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setSearchMode: (state: InitialState, action: PayloadAction<boolean>) => {
      state.isSearchMode = action.payload;
    },
    setSearchDone: (state: InitialState, action: PayloadAction<boolean>) => {
      state.isSearchDone = action.payload;
    },
    setNextSearch: (state: InitialState, action: PayloadAction<boolean>) => {
      state.isNextSearch = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getCityCoordinates.fulfilled, (state, action) => {
      state.cityCoordinates.data = action.payload ? action.payload : null;
      state.cityCoordinates.isPending = false;
      state.cityCoordinates.error = action.payload ? null : "Upps... Something was wrong!";
    });
    builder.addCase(getCityCoordinates.pending, (state, _action) => {
      state.cityCoordinates.data = null;
      state.cityCoordinates.isPending = true;
      state.cityCoordinates.error = null;
    });
    builder.addCase(getCityCoordinates.rejected, (state, _action) => {
      state.cityCoordinates.data = null;
      state.cityCoordinates.isPending = false;
      state.cityCoordinates.error = "Something was wrong...";
    });

    builder.addCase(getWeatherToday.fulfilled, (state, action) => {
      state.weatherToday.data = action.payload ? action.payload : null;
      state.weatherToday.isPending = false;
      state.weatherToday.error = action.payload ? null : "Upps... Something was wrong!";
    });
    builder.addCase(getWeatherToday.pending, (state, _action) => {
      state.weatherToday.data = null;
      state.weatherToday.isPending = true;
      state.weatherToday.error = null;
    });
    builder.addCase(getWeatherToday.rejected, (state, _action) => {
      state.weatherToday.data = null;
      state.weatherToday.isPending = false;
      state.weatherToday.error = "Something was wrong...";
    });

    builder.addCase(getWeatherForecast.fulfilled, (state, action) => {
      state.weatherForecast.data = action.payload ? action.payload : null;
      state.weatherForecast.isPending = false;
      state.weatherForecast.error = action.payload ? null : "Upps... Something was wrong!";
    });
    builder.addCase(getWeatherForecast.pending, (state, _action) => {
      state.weatherForecast.data = null;
      state.weatherForecast.isPending = true;
      state.weatherForecast.error = null;
    });
    builder.addCase(getWeatherForecast.rejected, (state, _action) => {
      state.weatherForecast.data = null;
      state.weatherForecast.isPending = false;
      state.weatherForecast.error = "Something was wrong...";
    });
  },
});

export const { setSearchMode, setSearchDone, setNextSearch } = weatherSlice.actions;

export default weatherSlice.reducer;
