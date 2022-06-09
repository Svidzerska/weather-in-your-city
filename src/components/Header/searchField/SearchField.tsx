import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";

import { ReactComponent as CancelIcon } from "../../../images/svg/xmarkIcon.svg";

import { getCityCoordinates, setSearchMode } from "../../../features/weather/weatherSlice";
import { Transition, TransitionStatus } from "react-transition-group";

const duration = 2000;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out,
   color ${duration}ms ease-in-out`,
  opacity: 0,
  color: "red",
};

const transitionStyles: { [key: string]: object } = {
  entering: { opacity: 0, color: "red" },
  entered: { opacity: 0, color: "green" },
  exiting: { opacity: 0, color: "blue" },
  exited: { opacity: 1, color: "violet" },
};

interface Props {
  handleSearch: Function;
  coordinates: { name: string; country: string; lat: number; lon: number };
}

const SearchField: React.FC<Props> = ({ handleSearch, coordinates }) => {
  const dispatch = useAppDispatch();
  const lookup = require("country-code-lookup");

  const [value, setValue] = useState<string>("");
  const [inProp, setInProp] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getCityCoordinates(value));
  }, [value]);

  const handleInput = (e: React.FormEvent<HTMLInputElement>): void => {
    setValue(e.currentTarget.value);
  };

  return (
    <Transition
      in={inProp}
      timeout={duration}
      addEndListener={(node, done) => {
        node.addEventListener("transitionend", () => dispatch(setSearchMode(false)), false);
      }}
    >
      {(state: TransitionStatus) => (
        <section
          className="searchModeSection"
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          <p>
            <input onChange={handleInput} type="text" value={value} />
            <button onClick={() => handleSearch} disabled={!(!!coordinates.country && coordinates.country !== "")}>
              <i>Search</i>
            </button>
          </p>
          <button
            onClick={() => {
              setInProp(true);
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
      )}
    </Transition>
  );
};

export default SearchField;
