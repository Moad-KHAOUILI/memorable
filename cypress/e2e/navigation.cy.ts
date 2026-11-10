describe('Navigation between screens', () => {
  it('opens all tasks from "See All" on the home screen', () => {
    cy.visit('/');
    cy.get('[data-testid="see-all-tasks"]').click();
    cy.url().should('include', '/tasks');
    cy.contains('Provide Mr. Uvarov With Eye Drops').should('exist');
  });

  it('opens a conversation and sends a message', () => {
    cy.visit('/messages');
    cy.get('[data-testid="conversation-c3"]').click();
    cy.contains('Dr. Zakaria Shahruri').should('exist');
    cy.get('[data-testid="chat-input"]').type('See you at the huddle{enter}');
    cy.contains('See you at the huddle').should('exist');
  });

  it('goes from Help to the assistant and gets an answer', () => {
    cy.visit('/');
    cy.get('[data-testid="help-button"]').click();
    cy.get('[data-testid="start-chat"]').click();
    cy.get('[data-testid="chat-input"]').type('How do I report an incident?{enter}');
    cy.contains('Make sure the patient is safe first').should('exist');
  });

  it('opens settings and filters them with search', () => {
    cy.visit('/');
    cy.get('[data-testid="settings-button"]').click();
    cy.get('[data-testid="settings-search"]').type('lang');
    cy.contains('App language').should('exist');
    cy.contains('Privacy and security').should('not.exist');
  });
});
