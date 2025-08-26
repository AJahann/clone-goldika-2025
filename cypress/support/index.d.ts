declare namespace Cypress {
  interface Chainable {
    login: (args: { phone: string; password: string }) => void;
  }
}
