// cypress/support/pages/bookingCalendarPage.js
// This file holds actions and checks for a room's booking calendar view.

class BookingCalendarPage {

    // Visit a specific room's reservation page with dates already applied
    visit(roomId, checkin, checkout) {
        cy.visit(`https://automationintesting.online/reservation/${roomId}?checkin=${checkin}&checkout=${checkout}`)
    }

    // Check the calendar's day buttons are visible
    verifyCalendarVisible() {
        cy.get('.rbc-button-link').should('be.visible')
    }
}

export default new BookingCalendarPage()