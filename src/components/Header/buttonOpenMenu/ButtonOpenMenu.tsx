import React, { useEffect, useState } from "react";
import { Transition, TransitionStatus } from "react-transition-group";
import { useAppDispatch } from "../../../app/hooks";
import { setSearchMode } from "../../../features/weather/weatherSlice";

import { ReactComponent as BurgerMenuIcon } from "../../../images/svg/burgerMenuIcon.svg";

const duration = 2000;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out,
   color ${duration}ms ease-in-out`,
  opacity: 0,
  color: "red",
};

const transitionStyles: { [key: string]: object } = {
  entering: { opacity: 0, color: "red" },
  entered: { opacity: 0, color: "green" }, //end point and switch of to search field
  exiting: { opacity: 0, color: "blue" },
  exited: { opacity: 1, color: "black" }, //start point
};

interface Props {
  inProp: boolean;
}

const ButtonOpenMenu: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [inProp, setInProp] = useState<boolean>(false);

  return (
    <Transition
      in={inProp}
      timeout={duration}
      addEndListener={(node, done) => {
        node.addEventListener(
          "transitionend",
          () => {
            dispatch(setSearchMode(true));
          },
          false
        );
      }}
    >
      {(state: TransitionStatus) => (
        <button
          className="burgerMenu"
          onClick={() => {
            setInProp(true);
          }}
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          <i>
            <BurgerMenuIcon />
          </i>
        </button>
      )}
    </Transition>
  );
};

export default ButtonOpenMenu;
