describe("My First Test", () => {
  it("Visits the Goldika", () => {
    cy.visit("http://localhost:3001");

    cy.get("a[href='/login']").click();
  });
});
