/// <reference types="cypress" />

const user = {
  username: "cypress",
  name: "Cypress",
  password: "cypress",
};

describe("Blog List", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/e2e/reset");
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("opens the login page", function () {
    cy.contains("Log in to the app");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#in-username").type(user.username);
      cy.get("#in-password").type(user.password);
      cy.get("#btn-submit").click();
      cy.contains(`${user.name} logged in`);
      cy.get(".notification").should("contain", "Logged in!");
    });

    it("fails with wrong credentials", function () {
      cy.get("#in-username").type("username");
      cy.get("#in-password").type("password");
      cy.get("#btn-submit").click();
      cy.get(".notification")
        .should("contain", "Login failed!. Username or password is incorrect")
        .and("have.css", "color", "rgb(255, 0, 0)");
    });
  });
});
