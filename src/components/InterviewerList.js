import React from "react";

import InterviewerListItem from "components/InterviewerListItem";

import "components/InterviewerList.scss";

export default function InterviewerList (props) {
  const interviewers = props.interviewers.map((value) =>
    <InterviewerListItem
      key={value.id}
      name={value.name}
      avatar={value.avatar}
      selected={value.id === props.interviewer}
      setInterviewer={event => props.onChange(value.id)}
    />
  )

  return (
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}