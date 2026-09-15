// cypress/support/api/authApi.js
// Plain-English helper functions for the login API.
// A test just calls these - it never writes raw cy.request() itself.

const loginUrl = 'https://automationintesting.online/api/auth/login'

class AuthApi {

    // Attempt to log in and return the whole response (status, body, everything)
    login(credentials) {
        return cy.request({
            method: 'POST',
            url: loginUrl,
            failOnStatusCode: false,
            body: credentials
        })
    }

    // Log in and just hand back the token (used when you need to act as an admin)
    getAuthToken(credentials) {
        return this.login(credentials).then((response) => response.body.token)
    }

    // Send genuinely broken JSON text to the login endpoint (for testing bad input handling)
    loginWithBrokenJson(brokenJsonText) {
        return cy.request({
            method: 'POST',
            url: loginUrl,
            body: brokenJsonText,
            headers: { 'Content-Type': 'application/json' },
            failOnStatusCode: false
        })
    }
}

export default new AuthApi()