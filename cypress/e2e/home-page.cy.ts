describe("home-page", () => {
  it("visits the home page", () => {
    cy.visit("/");
    cy.get("body").should("be.visible");
  });
});
