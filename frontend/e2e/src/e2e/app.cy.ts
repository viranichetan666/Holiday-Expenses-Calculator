import { getGreeting } from '../support/app.po';

describe('bunk-app', () => {
  beforeEach(() => cy.visit('/'));

  it('should display page', () => {
    // Custom command example, see `../support/commands.ts` file
    // cy.login('my-email@something.com', 'myPassword');

    // // Function helper example, see `../support/app.po.ts` file
    // getGreeting().contains('Welcome bunk-app');
  });
});
