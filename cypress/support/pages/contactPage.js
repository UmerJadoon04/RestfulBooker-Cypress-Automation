// cypress/support/pages/contactPage.js
// This file holds every action and check for the Contact form.

class ContactPage {

    visit() {
        cy.visit('https://automationintesting.online/#contact')
    }

    verifyHeading() {
        cy.get('.h4.mb-4.text-center').should('contain', 'Send Us a Message')
    }

    submitForm() {
        cy.get('.d-grid > .btn').click()
    }

    // Fill in the contact form using the given name and message details
    fillForm(name, message) {
        cy.get('#name').type(name)
        cy.get('#email').type(message.email)
        cy.get('#phone').type(message.phone)
        cy.get('#subject').type(message.subject)
        cy.get('#description').type(message.description)
    }

    // Check every required-field error message shows correctly
    verifyRequiredFieldErrors() {
        cy.get('.alert.alert-danger').should('contain', 'Name may not be blank')
        cy.get('.alert.alert-danger').should('contain', 'Email may not be blank')
        cy.get('.alert.alert-danger').should('contain', 'Phone may not be blank')
            .and('contain', 'Phone must be between 11 and 21 characters.')
        cy.get('.alert.alert-danger').should('contain', 'Subject must be between 5 and 100 characters.')
            .and('contain', 'Subject may not be blank')
        cy.get('.alert.alert-danger').should('contain', 'Message may not be blank')
            .and('contain', 'Message must be between 20 and 2000 characters')
    }

    // Check the confirmation message appears after a successful submission
    verifySubmissionSuccess() {
        cy.contains('Thanks for getting in touch').should('be.visible')
    }

    // Check the name field and submit button are visible
    verifyFormIsUsable() {
        cy.get('#name').should('be.visible')
        cy.get('.d-grid > .btn').should('be.visible')
    }
}

export default new ContactPage()