import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import "./header.scss";

import { ReactComponent as BurgerMenuIcon } from "../../images/svg/burgerMenuIcon.svg";
import { ReactComponent as CancelIcon } from "../../images/svg/xmarkIcon.svg";

import { setSearchMode } from "../../features/weather/weatherSlice";

const Header: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const isSearchMode: boolean = useAppSelector((state) => state.weather.isSearchMode);

  return (
    <header>
      {isSearchMode ? (
        <section className="searchModeSection">
          <p>
            <input type="text" />
            <button>
              <i>Search</i>
            </button>
          </p>
          <button onClick={() => dispatch(setSearchMode(false))}>
            <i>
              <CancelIcon />
            </i>
          </button>
        </section>
      ) : (
        <button className="burgerMenu" onClick={() => dispatch(setSearchMode(true))}>
          <i>
            <BurgerMenuIcon />
          </i>
        </button>
      )}
    </header>
  );
};

export default Header;
