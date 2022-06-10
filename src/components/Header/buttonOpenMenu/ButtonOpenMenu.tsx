import React, { useEffect, useState } from "react";
import { Transition, TransitionStatus, CSSTransition } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import "./buttonOpenMenu.scss";

import { setSearchMode } from "../../../features/weather/weatherSlice";

import { ReactComponent as BurgerMenuIcon } from "../../../images/svg/burgerMenuIcon.svg";

const duration = 2000;

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
      className="burgerMenu"
      appear={true}
      // addEndListener={(node, done) => {
      //   node.addEventListener("transitionend", () => dispatch(setSearchMode(true)), false);
      // }}
      // unmountOnExit={true}
      onExited={() => dispatch(setSearchMode(true))}
    >
      <button
        onClick={() => {
          // dispatch(setSearchMode(true));
          setInProp(false);
        }}
      >
        <i>
          <BurgerMenuIcon />
        </i>
      </button>
    </CSSTransition>
  );
};

export default ButtonOpenMenu;
