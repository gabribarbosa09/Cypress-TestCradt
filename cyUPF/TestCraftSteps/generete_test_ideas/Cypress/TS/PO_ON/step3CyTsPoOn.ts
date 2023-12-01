
// File: loginPage.ts

export class LoginPage {
    visit() {
        cy.visit('https://secure.upf.br/apps/login.php');
    }

    get usernameInput() {
        return cy.get('#f_usuario');
    }

    get passwordInput() {
        return cy.get('#f_senha');
    }

    get loginButton() {
        return cy.get('.btn.btn-primary.margin-left-10');
    }

    get forgotPasswordLink() {
        return cy.get('a[href="/apps/rede/troca_1.php"]');
    }

    get emailLink() {
        return cy.get('a[href="mailto:informacoes@upf.br"]');
    }

    get phoneNumberLink() {
        return cy.get('a[href="tel:+55-54-3316-8100"]');
    }

    get errorMessage() {
        return cy.get('.error-message');
    }

    login(username: string, password: string) {
        this.usernameInput.type(username);
        this.passwordInput.type(password);
        this.loginButton.click();
    }
}

// File: loginPage.spec.ts

import { LoginPage } from './loginPage';

const loginPage = new LoginPage();

describe('Login Page', () => {
    beforeEach(() => {
        loginPage.visit();
    });

    it('Verify form fields', () => {
        loginPage.usernameInput.should('be.visible');
        loginPage.passwordInput.should('be.visible');
    });

    it('Verify user can enter text', () => {
        loginPage.usernameInput.type('test');
        loginPage.passwordInput.type('test');
    });

    it('Verify user can submit form', () => {
        loginPage.login('test', 'test');
    });

    it('Verify form reset', () => {
        loginPage.login('test', 'test');
        cy.reload();
        loginPage.usernameInput.should('have.value', '');
        loginPage.passwordInput.should('have.value', '');
    });

    it('Verify forgot password link', () => {
        loginPage.forgotPasswordLink.should('have.attr', 'href', '/apps/rede/troca_1.php');
    });

    it('Verify email link', () => {
        loginPage.emailLink.should('have.attr', 'href', 'mailto:informacoes@upf.br');
    });

    it('Verify phone number link', () => {
        loginPage.phoneNumberLink.should('have.attr', 'href', 'tel:+55-54-3316-8100');
    });

    // More tests here...
});
```

Note: Not all test cases were implemented due to the complexity of some test cases. For example, to verify if the form does not submit when the 'Usuário' field contains more than 250 characters, you would need to know the server-side validation rules. Also, some test cases require interactions with external systems (like email clients and phone apps) which are outside the scope of Cypress. The same applies to test cases that require knowledge about the application's business logic or database (like user existence).