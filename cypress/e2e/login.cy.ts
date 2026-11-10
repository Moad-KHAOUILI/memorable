describe('Login screen', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('renders the login screen', () => {
    cy.contains('Memorable').should('exist');
    cy.get('[data-testid="login-button"]').should('exist');
    cy.get('[data-testid="help-button"]').should('exist');
  });

  it('navigates to the home screen on login', () => {
    cy.get('[data-testid="login-button"]').click();
    cy.contains('Your Medication Roster').should('exist');
  });
});

describe('Home screen', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('shows tasks and the medication roster', () => {
    cy.contains('Tasks').should('exist');
    cy.contains('Give Mr. Shahruri His Medicine').should('exist');
    cy.contains('Your Medication Roster').should('exist');
  });

  it('marks a medication as administered', () => {
    cy.get('[data-testid="administer-r2"]').click();
    cy.get('[data-testid="administer-r2"]').should('contain', 'Administered');
  });
});
