describe('Initial Load', () => {
  it('displays the main page with a list of activities', () => {
    cy.visit('/');
    cy.contains('Unforgettable Activities').should('exist');
    cy.get('input[placeholder="Search activities by name"]').should('exist');
    cy.get('input[type="checkbox"]').should('exist');
    cy.get('.custom-card').should('have.length', 10);
    cy.get('.ant-pagination').should('exist');
  });
});
