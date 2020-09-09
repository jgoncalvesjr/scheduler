import React from "react";

import "components/Appointment/index.scss";

import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "../../hooks/useVisualMode";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  //  Transitions SHOW or EMPTY, depending on existing interview or not
  const { mode, transition, back } = useVisualMode(
    props.interview? SHOW : EMPTY
  );

  //  Transitions SAVING animation when saving interview, then SAVE when ends or ERROR_SAVE if an error prevents saving
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));  
  }

  //  Transitions DELETING animation when deleting interview, then EMPTY when ends or ERROR_DELETE if an error prevents saving
  function remove(id) {
    transition(DELETING, true);
    props.removeInterview(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  //  Renders appointment component depending on current state of each slot
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && 
      <Form 
        interviewers={props.interviewers} 
        onCancel={back}
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
        message="Are you sure you would like to delete the appointment?" 
        onCancel={back} 
        onConfirm={() => remove(props.id)} 
      />
      }
      {mode === SAVING && <Status message="Saving" />}
      {mode === ERROR_SAVE && <Error message="Unable to save appointment." onClose={back} />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === ERROR_DELETE && <Error message="Unable to delete appointment." onClose={back} />}
      {mode === EDIT && 
      <Form 
        name={props.interview.student} 
        interviewer={props.interview.interviewer.id} 
        interviewers={props.interviewers} 
        onSave={save} 
        onCancel={back} 
      />
      }
    </article>
  );

}