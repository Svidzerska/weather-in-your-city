import React, { useEffect, useState } from "react";
import { Transition, TransitionStatus, CSSTransition, TransitionGroup } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import "./buttonOpenMenu.scss";

import { setSearchMode } from "../../../features/weather/weatherSlice";

import { ReactComponent as BurgerMenuIcon } from "../../../images/svg/burgerMenuIcon.svg";

const duration = 250;

const ButtonOpenMenu: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const isSearchMode: boolean = useAppSelector((state) => state.weather.isSearchMode);
  const [inProp, setInProp] = useState<boolean>(false);

  useEffect(() => {
    console.log(isSearchMode);
  }, [isSearchMode]);

  useEffect(() => {
    !isSearchMode && setInProp(true);
  }, [isSearchMode]);

  return (
    <CSSTransition
      in={inProp}
      timeout={duration}
      classNames="burgerMenu"
      onExited={() => setTimeout(() => dispatch(setSearchMode(true)), 3000)}
    >
      <section className="burgerMenu">
        <button
          onClick={() => {
            setInProp(false);
          }}
        >
          <i>
            <BurgerMenuIcon />
          </i>
        </button>
      </section>
    </CSSTransition>
  );
};

export default ButtonOpenMenu;
