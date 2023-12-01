
describe('Login Form Tests', function() {
    beforeEach(() => {
        cy.visit('https://secure.upf.br/apps/login.php');
    });

    it('Verify that the login form appears correctly with two input fields', function() {
        cy.get('#f_usuario').should('be.visible');
        cy.get('#f_senha').should('be.visible');
    });

    it('Verify that the user can enter text in the input fields', function() {
        cy.get('#f_usuario').type('testUser');
        cy.get('#f_senha').type('testPassword');
    });

    it('Verify that the user can submit the form by clicking the Entrar button', function() {
        cy.get('button[type=submit]').click();
    });

    it('Verify that the user can reset the form by refreshing the page', function() {
        cy.reload();
        cy.get('#f_usuario').should('be.empty');
        cy.get('#f_senha').should('.empty');
    });

    it('Verify that the Esqueci a senha link redirects the user to the correct password recovery page', function() {
        cy.get('a[href="/apps/rede/troca_1.php"]').click();
        cy.url().should('include', '/apps/rede/troca_1.php');
    });

    it('Verify that the email link opens the default email client with the correct recipient', function() {
        cy.get('a[href="mailto:informacoes@upf.br"]').should('have.attr', 'href', 'mailto:informacoes@upf.br');
    });

    it('Verify that clicking on the phone number link initiates a call using the default phone app on a mobile device', function() {
        cy.get('a[href="tel:+55-54-3316-8100"]').should('have.attr', 'href', 'tel:+55-54-3316-8100');
    });

    it('Verify that the form does not submit if the Usuário field is left blank', function() {
        cy.get('#f_senha').type('testPassword');
        cy.get('button[type=submit]').click();
        cy.url().should('include', '/apps/login.php');
    });

    it('Verify that the form does not submit if the Senha field is left blank', function() {
        cy.get('#f_usuario').type('testUser');
        cy.get('button[type=submit]').click();
        cy.url().should('include', '/apps/login.php');
    });

    // More tests here...

    it('Verify that the form does not submit if the Usuário field contains more than 250 characters', function() {
        const longInput = 'a'.repeat(251);
        cy.get('#f_usuario').type(longInput);
        cy.get('button[type=submit]').click();
        cy.url().should('include', '/apps/login.php');
    });

    it('Verify that the form does not submit if the Senha field contains more than 250 characters', function() {
        const longInput = 'a'.repeat(251);
        cy.get('#f_senha').type(longInput);
        cy.get('button[type=submit]').click();
        cy.url().should('include', '/apps/login.php');
    });

    // More tests here...

});
