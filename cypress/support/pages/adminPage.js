class AdminPage {

    visit() {
        cy.visit('https://automationintesting.online/admin')
    }

    // Log in with the given username and password
    login(credentials) {
        cy.get('#username').type(credentials.username)
        cy.get('#password').type(credentials.password)
        cy.get('#doLogin').click()
    }

    // Go to the Messages tab
    goToMessages() {
        cy.contains('.nav-link', 'Messages').click()
    }

    // Check a message with the given name and subject is visible in the list
    verifyMessageExists(name, subject) {
        cy.contains(name).should('be.visible')
        cy.contains(subject).should('be.visible')
    }
}

export default new AdminPage()
