/// <reference types="cypress" />

describe("Blog List", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/e2e/reset");
    cy.visit("http://localhost:3000");
  });

  it("opens the login page", function () {
    cy.contains("Log in to the app");
  });
});
