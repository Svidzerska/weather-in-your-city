import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import "./searchField.scss";

import { ReactComponent as CancelIcon } from "../../../images/svg/xmarkIcon.svg";

import { getCityCoordinates, setSearchMode } from "../../../features/weather/weatherSlice";
import { Transition, TransitionStatus, CSSTransition } from "react-transition-group";

const duration = 250;

interface Props {
  handleSearch: Function;
  coordinates: { name: string; country: string; lat: number; lon: number };
}

const SearchField: React.FC<Props> = ({ handleSearch, coordinates }) => {
  const dispatch = useAppDispatch();
  const lookup = require("country-code-lookup");

  const isSearchMode: boolean = useAppSelector((state) => state.weather.isSearchMode);

  const [value, setValue] = useState<string>("");
  const [inProp, setInProp] = useState<boolean>(false);

  useEffect(() => {
    console.log(value);
    value !== "" && dispatch(getCityCoordinates(value));
  }, [value]);

  useEffect(() => {
    isSearchMode && setInProp(true);
  }, [isSearchMode]);

  const handleInput = (e: React.FormEvent<HTMLInputElement>): void => {
    setValue(e.currentTarget.value);
  };

  return (
    <CSSTransition
      in={inProp}
      timeout={duration}
      className="search"
      appear={true}
      // addEndListener={(node, done) => {
      //   node.addEventListener("transitionend", () => dispatch(setSearchMode(false)), false);
      // }}
      unmountOnExit={true}
      onExited={() => dispatch(setSearchMode(false))}
    >
      <section>
        <p>
          <input onChange={handleInput} type="text" value={value} />
          <button onClick={() => handleSearch()} disabled={!(!!coordinates.country && coordinates.country !== "")}>
            <i>Search</i>
          </button>
        </p>
        <button
          onClick={() => {
            // dispatch(setSearchMode(false));
            setInProp(false);
          }}
        >
          <i>
            <CancelIcon />
          </i>
        </button>
        <p className="searchCityCountry">
          {coordinates.name}
          <br />
          {coordinates.country && lookup.byIso(coordinates.country)?.country}
        </p>
      </section>
    </CSSTransition>
  );
};

export default SearchField;
