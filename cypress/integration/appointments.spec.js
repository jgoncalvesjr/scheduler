describe("Appointments", () => {
  // 0. Flushes test Database, visits root of web server. 
  beforeEach(() => {
   cy.request("GET", "/api/debug/reset");
 
   cy.visit("/");
 
   cy.contains("Monday");
  });
 
  it("should book an interview", () => {
    // 1. Clicks on the "Add" button in the second appointment
    cy.get("[alt=Add]")
      .first()
      .click();

    // 2. Enters student name
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");
  
    // 3. Chooses an interviewer
    cy.get('[alt="Sylvia Palmer"]')
      .click();

    // 4. Clicks the save button
    cy.contains("Save")
      .click();

    // 5. Verifies the existence of new booked appointment after saving
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    // 1. Clicks on the "Edit" button in an existing appointment
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });

    // 2. Clears and changes student name
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Joao Goncalves Jr");
    
    // 3. Changes the interviewer
    cy.get('[alt="Tori Malcolm"]')
      .click();
    
    // 4. Clicks the save button
    cy.contains("Save")
      .click();
    
    // 5. Verifies the existence of edited appointment after saving
    cy.contains(".appointment__card--show", "Joao Goncalves Jr");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    // 1. Clicks on the "Delete" button in an existing appointment
    cy.get("[alt=Delete]")
      .click({ force: true });
    
    // 2. Clicks the Confirm button
    cy.contains("Confirm")
      .click();
  
    // 3. Verifies that Deleting display is shown, then cleared
    cy.contains("Deleting")
      .should("exist");
    cy.contains("Deleting")
      .should("not.exist");

    // 4. Verifies that deleted appointment does not exist anymore
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
});