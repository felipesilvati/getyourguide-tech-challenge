describe('Homepage Test', () => {
  it('successfully loads', () => {
    cy.visit('/');
    cy.contains('Unforgettable').should('exist');
  });
});
