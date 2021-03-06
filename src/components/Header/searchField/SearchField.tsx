import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import "./searchField.scss";

import { ReactComponent as CancelIcon } from "../../../images/svg/xmarkIcon.svg";

import { getCityCoordinates, setSearchDone, setSearchMode } from "../../../features/weather/weatherSlice";

const duration = 500;

const SearchField: React.FC = () => {
  const dispatch = useAppDispatch();
  const lookup = require("country-code-lookup");

  const [value, setValue] = useState<string>("");
  const [isGetCoordinates, setGetCoordinates] = useState<boolean>(false);

  const cityCoordinates: { data: any | null; isPending: boolean; error: any | null } = useAppSelector(
    (state) => state.weather.cityCoordinates
  );

  const isSearchDone: boolean = useAppSelector((state) => state.weather.isSearchDone);

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
    isSearchDone ? dispatch(setSearchDone(false)) : dispatch(setSearchDone(true));
  };

  useEffect(() => {
    value.length === 1 && dispatch(getCityCoordinates(value)).then(() => setGetCoordinates(true));
  }, [value]);

  const handleInput = (e: React.FormEvent<HTMLInputElement>): void => {
    setGetCoordinates(false);
    setSearchDone(false);
    setValue(e.currentTarget.value);
  };

  return (
    <section className="search">
      <p>
        <CSSTransition in={isGetCoordinates} timeout={duration} classNames="textInput">
          <input onChange={handleInput} type="text" value={value} />
        </CSSTransition>
        <button onClick={() => handleSearch()} disabled={!(!!coordinates.country && value !== "")}>
          <i>Search</i>
        </button>
      </p>
      <button
        onClick={() => {
          dispatch(setSearchMode(false));
        }}
      >
        <i>
          <CancelIcon />
        </i>
      </button>
      <CSSTransition
        in={isGetCoordinates}
        timeout={duration}
        classNames="searchCityCountry"
        onExited={() => {
          value !== "" && dispatch(getCityCoordinates(value)).then(() => setGetCoordinates(true));
        }}
      >
        <p className="searchCityCountry">
          {coordinates.name}
          <br />
          {coordinates.country && lookup.byIso(coordinates.country).country}
        </p>
      </CSSTransition>
    </section>
  );
};

export default SearchField;
