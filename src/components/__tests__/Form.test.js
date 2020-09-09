import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} name="Lydia Miller-Jones" />
    );  
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {

    /* 1. Save button is clicked on an empty student field */
    const onSave = jest.fn();
    const { getByText } = render(<Form interviewers={interviewers} onSave={onSave}/>);
    fireEvent.click(getByText("Save"));
    
    /* 2. validation is shown */
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
  
    /* 3. onSave is not called */
    expect(onSave).not.toHaveBeenCalled();
  });

  it("validates that an interviewer was selected, even if a student name was placed", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <Form
        interviewers={interviewers}
        onSave={onSave}
      />
    );

    /* 1. Student name is placed */
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    /* 2. Save button is clicked */
    fireEvent.click(getByText("Save"));
    
    /* 3. Validation is shown */
    expect(getByText(/an interviewer must be selected/i)).toBeInTheDocument();
  
    /* 4. onSave is not called*/
    expect(onSave).not.toHaveBeenCalled();
  
  });

  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const { getByText, getByAltText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
  
    /* 1. Save button is clicked on an empty student field */
    fireEvent.click(getByText("Save"));
  
    /* 2. Validation is shown, onSave is not called */
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();

    /* 3. Student name placed, interviewer is selected, save button is clicked */
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByAltText("Sylvia Palmer"));
    fireEvent.click(getByText("Save"));

    /* 4. Validation text disappears, onSave is called with student name and interviewer ID */  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });

  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
  
    fireEvent.click(getByText("Save"));

    /* 1. Form content is changed */
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    
    /* 2. Cancel button is clicked */
    fireEvent.click(getByText("Cancel"));
         
    /* 3. onCancel is called, no validation is shown, student name is blank */
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
  
});