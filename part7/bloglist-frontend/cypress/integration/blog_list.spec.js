/// <reference types="cypress" />

const user = {
  username: "cypress",
  name: "Cypress",
  password: "cypress",
};
const user_2 = {
  username: "cypress2",
  name: "Cypress 2",
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

    it("a blog can be created", function () {
      cy.get("#btn-toggle").click();
      cy.get(".input-title").type("A new blog");
      cy.get(".input-author").type("Cypress");
      cy.get(".input-url").type("https://www.cypress.io/");
      cy.get(".button-submit").click();
      cy.get(".notification").contains("Blog added A new blog");
      cy.get("#blog-list").contains("A new blog");
    });

    describe("and a blog is present", function () {
      beforeEach(function () {
        cy.get("#btn-toggle").click();
        cy.get(".input-title").type("A new blog");
        cy.get(".input-author").type("Cypress");
        cy.get(".input-url").type("https://www.cypress.io/");
        cy.get(".button-submit").click();
      });

      it("it can be liked", function () {
        cy.get(".blog")
          .first()
          .then(($blog) => {
            $blog.find("#btn-toggle").click();
            $blog.find("#btn-blog-like").click();
            cy.wrap($blog).should("contain", "likes 1");
          });
      });

      it("it can be deleted by owner", function () {
        cy.get(".blog")
          .first()
          .then(($blog) => {
            $blog.find("#btn-toggle").click();
            $blog.find("#btn-blog-delete").click();
          });
        cy.get(".blog").should("not.exist");
      });

      describe("user logs out and a new user logs in", function () {
        beforeEach(function () {
          cy.request("POST", "http://localhost:3003/api/users", user_2);
          cy.contains("Logout").click();
          cy.login(user_2.username, user_2.password);
        });
        it("it cannot be deleted by non owners", function () {
          cy.get(".blog")
            .first()
            .then(($blog) => {
              $blog.find("#btn-toggle").click();
              cy.wrap($blog).find("#btn-blog-delete").should("not.exist");
            });
        });
      });
    });

    describe("and a multiple blogs are present", function () {
      beforeEach(function () {
        cy.get("#btn-toggle").click();
        cy.get(".input-title").type("First Blog");
        cy.get(".input-author").type("Cypress");
        cy.get(".input-url").type("https://www.cypress.io/");
        cy.get(".button-submit").click();

        cy.get("#btn-toggle").click();
        cy.get(".input-title").type("Second Blog");
        cy.get(".input-author").type("Cypress");
        cy.get(".input-url").type("https://www.cypress.io/");
        cy.get(".button-submit").click();

        cy.get("#btn-toggle").click();
        cy.get(".input-title").type("Third Blog");
        cy.get(".input-author").type("Cypress");
        cy.get(".input-url").type("https://www.cypress.io/");
        cy.get(".button-submit").click();
      });

      it.only("shows the most liked blog first", function () {
        cy.get(".blog")
          .last()
          .then(($blog) => {
            $blog.find("#btn-toggle").click();
            $blog.find("#btn-blog-like").click();
            cy.wrap($blog).should("contain", "likes 1");
            cy.get(".blog").first().should("contain", "Third Blog");
          });
      });
    });
  });
});
