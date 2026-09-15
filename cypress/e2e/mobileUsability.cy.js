/// <reference types="cypress" />
import homePage from '../support/pages/homePage'
import contactPage from '../support/pages/contactPage'
import bookingCalendarPage from '../support/pages/bookingCalendarPage'

describe('Mobile Usability', () => {
    beforeEach(() => {
        cy.viewport(375, 667) // iPhone SE size
    })

    it('should let a user see and use the homepage on mobile', () => {
        homePage.visit()
        homePage.verifyNavAndRoomsVisible()
    })

    it('should let a user see and use the booking calendar on mobile', () => {
        bookingCalendarPage.visit(1, '2026-09-13', '2026-09-14')
        bookingCalendarPage.verifyCalendarVisible()
    })

    it('should let a user see and use the contact form on mobile', () => {
        contactPage.visit()
        contactPage.verifyFormIsUsable()
    })
})