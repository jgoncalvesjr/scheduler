import React, { useState } from "react";

import InterviewerList from "../InterviewerList";
import Button from "../Button";

//  Form component displaying student name and interviewes available for day

export default function Form(props) {

  // State for student name, interviewer and error message, when applicable
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // Resets form
  const reset = () => {
    setName("");
    setInterviewer(null);
  }

  // When Cancel button is pressed, form is reset
  const cancel = () => {
    reset();
    props.onCancel();
  }

  // Validates if a student name or interviewer are blank. Saves if both are filled
  const validate = () => {
    
    if (!name) {
      setError("Student name cannot be blank");
      return;
    }
    
    if (!interviewer) {
      setError("An interviewer must be selected");
      return;
    }
    
    setError("");
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" 
              onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={name}
            placeholder="Enter Student Name"
            onChange={event => setName(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList 
          interviewers={props.interviewers} 
          value={interviewer} 
          onChange={setInterviewer} 
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );

}