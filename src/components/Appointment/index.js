import React from "react";

import "components/Appointment/index.scss";

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "../../hooks/useVisualMode";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));  
  }

  function remove(id) {
    transition(DELETING);
    props.removeInterview(id)
      .then(() => transition(EMPTY));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && 
      <Form 
        interviewers={props.interviewers} 
        onCancel={() => back()}
        onSave={save}
      />
      }
      {mode === SHOW && 
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
      />
      }
      {mode === CONFIRM && 
      <Confirm 
        message="Are you sure?" 
        onCancel={() => back()} 
        onConfirm={() => remove(props.id)} 
      />
      }
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === EDIT && 
      <Form 
        name={props.interview.student} 
        interviewer={props.interview.interviewer.id} 
        interviewers={props.interviewers} 
        onSave={save} 
        onCancel={() => back()} 
      />
      }
    </article>
  );

}