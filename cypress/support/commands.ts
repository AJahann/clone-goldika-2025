Cypress.Commands.add("login", ({ phone, password }) => {
  cy.session([phone, password], () => {
    cy.visit("/login");
    cy.get('input[id="number"]').type(phone);
    cy.get('input[id="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/dashboard");
  });
});
