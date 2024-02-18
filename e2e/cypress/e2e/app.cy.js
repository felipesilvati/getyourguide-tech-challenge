describe('Initial Load', () => {
  it('displays the main page with a list of activities', () => {
    cy.visit('/');
    cy.contains('Unforgettable Activities').should('exist');
    cy.get('input[placeholder="Search activities by name"]').should('exist');
    cy.get('input[type="checkbox"]').should('exist');
    cy.get('.ant-card').should('have.length', 10);
    cy.get('.ant-pagination').should('exist');
  });
});

describe('Search Functionality', () => {
  it('updates the list of activities according to the search term', () => {
    cy.visit('/');
    cy.get('input[placeholder="Search activities by name"]').type('Berlin');
    cy.wait(500); // Debounce time
    cy.get('.ant-card').should('have.length.at.least', 1);
    cy.get('.ant-card-meta-title').each(($title) => {
      cy.wrap($title).should('contain', 'Berlin');
    });
  });

  it('shows no activities found when search does not match any activities', () => {
    cy.visit('/');
    cy.get('input[placeholder="Search activities by name"]').type('NonExistingActivity');
    cy.wait(500);
    cy.contains('No activities found').should('be.visible');
  });
});