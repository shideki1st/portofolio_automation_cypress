describe('Login Web', () => {
    it('Successfull login', () => {
        cy.visit('https://barru.pythonanywhere.com')
        cy.get('input#email').type('batch27@gmail.com');
        cy.get('#password').type('batch27');
        cy.get('#signin_login').click();
        cy.contains('Welcome peserta ganteng').should('be.visible');
    });

    it('Failed login with wrong password', () => {
        cy.visit('https://barru.pythonanywhere.com')
        cy.get('#email').type('batch27@gmail.com');
        cy.get('#password').type('passwordsalahhhhh');
        cy.get('#signin_login').click();
        cy.contains("User's not found").should('be.visible');
    });
  });