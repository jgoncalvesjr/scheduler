import React from "react";

import "components/Appointment/index.scss";

// import Header from "components/Appointment/Header";

export default function Appointment(props) {

  return (
    <article className="appointment">{props.time}</article>
  );

}