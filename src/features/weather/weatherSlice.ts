import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { apiWeather } from "../../api/apiWeather";

interface InitialState {
  isSearchMode: boolean;
  cityCoordinates: { data: any | null; isPending: boolean; error: any | null };
}

interface Data {
  data: any;
}

const initialState: InitialState = {
  isSearchMode: false,
  cityCoordinates: { data: null, isPending: false, error: null },
};

export const getCityCoordinates = createAsyncThunk<Data, string>(
  "cityCoordinates/getCityCoordinates",
  async (city: string) => {
    return apiWeather.getCityCoordinates(city)?.then((data) => {
      console.log(data);
      return data; //payload - data
    }) as Promise<Data>;
  }
);

export const getWeatherToday = createAsyncThunk<Data, { lat: number; lon: number }>(
  "weatherToday/getWeatherToday",
  async (coordinates) => {
    const { lat, lon } = coordinates;
    return apiWeather.getWeatherToday(lat, lon)?.then((data) => {
      console.log(data);
      return data; //payload - data
    }) as Promise<Data>;
  }
);

export const getWeatherForecast = createAsyncThunk<Data, { lat: number; lon: number }>(
  "weatherForecast/getWeatherForecast",
  async (coordinates) => {
    const { lat, lon } = coordinates;
    return apiWeather.getWeatherForecast(lat, lon)?.then((data) => {
      console.log(data);
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
  },
});

export const { setSearchMode } = weatherSlice.actions;

export default weatherSlice.reducer;
