import React from "react";

import { ReactComponent as CaretDownIcon } from "../../../images/svg/caretDownIcon.svg";

interface Props {
  item: any;
  clickMore: Function;
}

const WeatherShort: React.FC<Props> = ({ item, clickMore }): JSX.Element => {
  return (
    <div className="forecastView_oneDay">
      <button onClick={() => clickMore(item?.day)}>
        <i>
          <CaretDownIcon />
        </i>
        <span>{item?.day}</span>
      </button>
      <p>
        <span>{item?.temperature} &#176;C</span>
        <br />
        <span>{item?.clouds}</span>
      </p>
    </div>
  );
};

export default WeatherShort;
