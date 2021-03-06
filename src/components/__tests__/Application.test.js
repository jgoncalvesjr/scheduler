import React from "react";

import axios from "axios";

import { 
  render, 
  cleanup, 
  fireEvent, 
  waitForElement, 
  getByText, 
  getAllByTestId, 
  getByAltText, 
  getByPlaceholderText,
  queryByAltText, 
  queryByText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  it("changes the schedule when a new day is selected", async () => {
    // 1. Render the Application.
    const { getByText, queryByText } = render(<Application />);
    
    // 2. Wait day "Monday" do be displayed.
    await waitForElement(() => getByText("Monday"));

    // 3. Click on day "Tuesday".
    fireEvent.click(getByText("Tuesday"));

    // 4. Verify the correct names are displayed, according to fixtures.
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
    expect(queryByText("Archie Cohen")).toBeNull();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click to add a new appointment.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    // 4. Insert student name and chooses an interviewer, and save.
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    // 5. "Saving" display is shown.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 6. New appointment is visible.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // 7. Appointments available for Monday are reduced by one.
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Delete"));
  
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete the appointment?")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, 'Add'));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  
  });

  it('loads data, edits an interview and keeps the spots remaining for Monday the same', async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Edit"));

    // 4. "Save" button should be visible in EDIT mode.
    expect(getByText(appointment, "Save")).toBeInTheDocument();

    // 5. Interviewer and student should be properly changed.
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Joao Goncalves Jr" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    // 6. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 7. New student name should be visible in the saved component.
    await waitForElement(() => getByText(appointment, "Joao Goncalves Jr"));

    // 8. Available spots left should not be changed.
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    // 1. Axios mocks a failed PUT request
    axios.put.mockRejectedValueOnce();
    
    // 2. Render the Application.
    const { container } = render(<Application />);

    // 3. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 4. Clicks to add a new appointment.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    // 5. Inserts student name and chooses an interviewer, and saves
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    // 6. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 7. Error component should be loaded from request failure.
    await waitForElement(() => getByText(appointment, "Unable to save appointment."));

    // 8. Saving error message should be visible to the user.
    expect(getByText(appointment, "Unable to save appointment.")).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    // 1. Axios mocks a failed DELETE request
    axios.delete.mockRejectedValueOnce();

    // 2. Render the Application.
    const { container } = render(<Application />);
  
    // 3. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 4. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Delete"));
  
    // 5. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete the appointment?")).toBeInTheDocument();

    // 6. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));

    // 7. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();   
    
    // 8. Error component should be loaded from request failure.
    await waitForElement(() => getByText(appointment, "Unable to delete appointment."));

    // 9. Deleting error message should be visible to the user.
    expect(getByText(appointment, "Unable to delete appointment.")).toBeInTheDocument();    
  });

});