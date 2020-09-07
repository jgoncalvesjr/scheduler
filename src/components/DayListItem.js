import React from "react";

import "components/DayListItem.scss";

import classNames from "classnames";

export default function DayListItem(props) {

  const formatSpots = spotsLeft => ({
    1 : '1 spot remaining',
    0 : 'no spots remaining'
 }[spotsLeft] || `${spotsLeft} spots remaining`);

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected" : props.selected,
    "day-list__item--full" : !props.spots
  });

  return (
    <li className={dayClass} data-testid="day" onClick={() => props.setDay(props.name)}>
      <h2>{props.name}</h2>
      <h3>{formatSpots(props.spots)}</h3>
    </li>
  );
}