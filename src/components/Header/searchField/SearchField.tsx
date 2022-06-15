import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import "./searchField.scss";

import { ReactComponent as CancelIcon } from "../../../images/svg/xmarkIcon.svg";

import {
  getCityCoordinates,
  getWeatherForecast,
  getWeatherToday,
  setSearchMode,
} from "../../../features/weather/weatherSlice";
import { Transition, TransitionStatus, CSSTransition } from "react-transition-group";

const duration = 250;

interface Props {
  handleSearch: Function;
  coordinates: { name: string; country: string; lat: number; lon: number };
}

const SearchField: React.FC = () => {
  const dispatch = useAppDispatch();
  const lookup = require("country-code-lookup");

  const isSearchMode: boolean = useAppSelector((state) => state.weather.isSearchMode);

  const [value, setValue] = useState<string>("");
  const [isGetCoordinates, setGetCoordinates] = useState<boolean>(false);
  const [inProp, setInProp] = useState<boolean>(false);

  const cityCoordinates: { data: any | null; isPending: boolean; error: any | null } = useAppSelector(
    (state) => state.weather.cityCoordinates
  );

  const [coordinates, setCoordinates] = useState<{
    name: string;
    country: string;
    lat: number;
    lon: number;
  }>({
    name: "",
    country: "",
    lat: 0,
    lon: 0,
  });

  useEffect(() => {
    value !== "" &&
      cityCoordinates?.data &&
      setCoordinates({
        ...coordinates,
        name: cityCoordinates.data[0]?.name,
        country: cityCoordinates.data[0]?.country,
        lat: cityCoordinates.data[0]?.lat,
        lon: cityCoordinates.data[0]?.lon,
      });
  }, [cityCoordinates]);

  const handleSearch = (): void => {
    dispatch(getWeatherToday(coordinates));
    dispatch(getWeatherForecast(coordinates));
  };

  useEffect(() => {
    console.log(coordinates);
  }, [coordinates]);

  useEffect(() => {
    value.length === 1 && dispatch(getCityCoordinates(value)).then(() => setGetCoordinates(true));
  }, [value]);

  useEffect(() => {
    isSearchMode && setInProp(true);
  }, [isSearchMode]);

  const handleInput = (e: React.FormEvent<HTMLInputElement>): void => {
    setGetCoordinates(false);
    setValue(e.currentTarget.value);
  };

  return (
    <CSSTransition in={inProp} timeout={duration} className="search" onExited={() => dispatch(setSearchMode(false))}>
      <section>
        <p>
          <CSSTransition in={isGetCoordinates} timeout={500} classNames="textInput">
            <input onChange={handleInput} type="text" value={value} />
          </CSSTransition>
          <button onClick={() => handleSearch()} disabled={!(!!coordinates.country && value !== "")}>
            <i>Search</i>
          </button>
        </p>
        <button
          onClick={() => {
            setInProp(false);
          }}
        >
          <i>
            <CancelIcon />
          </i>
        </button>
        <CSSTransition
          in={isGetCoordinates}
          timeout={duration}
          className="searchCityCountry"
          onExited={() => {
            value !== "" && dispatch(getCityCoordinates(value)).then(() => setGetCoordinates(true));
          }}
        >
          <p>
            {coordinates.name}
            <br />
            {coordinates.country && lookup.byIso(coordinates.country).country}
          </p>
        </CSSTransition>
      </section>
    </CSSTransition>
  );
};

export default SearchField;
