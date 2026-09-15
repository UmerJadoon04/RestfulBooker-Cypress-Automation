/// <reference types="cypress" />
import contactPage from '../support/pages/contactPage'
import adminPage from '../support/pages/adminPage'

describe('Contact Form', () => {
    it('should show an error for every required field left empty', () => {
        contactPage.visit()
        contactPage.verifyHeading()
        contactPage.submitForm()
        contactPage.verifyRequiredFieldErrors()
    })

    it('should submit a contact message and confirm it appears in the admin panel', () => {
        cy.fixture('guestData').then((guestData) => {
            cy.fixture('adminData').then((adminData) => {
                const testName = `Cypress Test ${Date.now()}`

                contactPage.visit()
                contactPage.fillForm(testName, guestData.contactMessage)
                contactPage.submitForm()
                contactPage.verifySubmissionSuccess()

                adminPage.visit()
                adminPage.login(adminData.validAdmin)
                adminPage.goToMessages()
                adminPage.verifyMessageExists(testName, guestData.contactMessage.subject)
            })
        })
    })
})