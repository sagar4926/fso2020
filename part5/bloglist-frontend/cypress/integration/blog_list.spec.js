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

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login(user.username, user.password);
    });

    it.only("a blog can be created", function () {
      cy.get("#btn-toggle").click();
      cy.get(".input-title").type("A new blog");
      cy.get(".input-author").type("Cypress");
      cy.get(".input-url").type("https://www.cypress.io/");
      cy.get(".button-submit").click();
      cy.get(".notification").contains("Blog added A new blog");
      cy.get("#blog-list").contains("A new blog");
    });
  });
});
