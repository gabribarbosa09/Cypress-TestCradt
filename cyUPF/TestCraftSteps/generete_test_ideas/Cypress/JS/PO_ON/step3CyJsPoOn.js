
// loginPage.js

class LoginPage {
    get usuarioInput() { return '#f_usuario'; }
    get senhaInput() { return '#f_senha'; }
    get entrarButton() { return '.btn.btn-primary.margin-left-10'; }
    get esqueciSenhaLink() { return 'a[href="/apps/rede/troca_1.php"]'; }
    get emailLink() { return 'a[href="mailto:informacoes@upf.br"]'; }
    get phoneNumberLink() { return 'a[href="tel:+55-54-3316-8100"]'; }
    get errorMessage() { return '.error-message'; }

    enterUsuario(usuario) {
        cy.get(this.usuarioInput).type(usuario);
    }

    enterSenha(senha) {
        cy.get(this.senhaInput).type(senha);
    }

    clickEntrar() {
        cy.get(this.entrarButton).click();
    }

    visit() {
        cy.visit('https://secure.upf.br/apps/login.php');
    }
}

export default LoginPage;

// loginPage.spec.js

import LoginPage from './loginPage';

describe('Login Page', () => {
    const loginPage = new LoginPage();

    beforeEach(() => {
        loginPage.visit();
    });

    it('Login form appears correctly with two input fields', () => {
        cy.get(loginPage.usuarioInput).should('be.visible');
        cy.get(loginPage.senhaInput).should('be.visible');
    });

    it('User can enter text in the input fields', () => {
        loginPage.enterUsuario('testUser');
        loginPage.enterSenha('testPass');
    });

    it('User can submit the form by clicking the enter button', () => {
        loginPage.enterUsuario('testUser');
        loginPage.enterSenha('testPass');
        loginPage.clickEntrar();
    });

    it('User can reset the form by refreshing the page', () => {
        loginPage.enterUsuario('testUser');
        loginPage.enterSenha('testPass');
        cy.reload();
        cy.get(loginPage.usuarioInput).should('have.value', '');
        cy.get(loginPage.senhaInput).should('have.value', '');
    });

    // Continue with the rest of the tests following the same pattern...
});
```

Please note that some tests may require additional setup or may not be possible to fully automate with Cypress (e.g., verifying email client opens or phone call initiates). Also, for tests that expect form submission to fail or error messages to appear, the server would need to be set up to provide the appropriate responses.