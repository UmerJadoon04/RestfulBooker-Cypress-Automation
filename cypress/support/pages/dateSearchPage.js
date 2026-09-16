class DateSearchPage {

    goToBookingSection() {
        cy.get('a[href="/#booking"]').click()
    }

    // Pick a check-in day from the first calendar
    selectCheckInDay(day) {
        cy.get('.react-datepicker__input-container').eq(0).click()
        cy.contains('.react-datepicker__day', day.toString()).click()
    }

    // Pick a check-out day from the second calendar
    selectCheckOutDay(day) {
        cy.get('.react-datepicker__input-container').eq(1).click()
        cy.contains('.react-datepicker__day', day.toString()).click()
    }

    // Click the search button to look for available rooms
    searchRooms() {
        cy.get('.btn.btn-primary.w-100.py-2').click()
    }

    // Check the rooms section shows up with at least one result
    verifySearchResultsShown() {
        cy.get('#rooms .text-center').should('contain', 'Our Rooms')
        cy.get('.room-card').should('have.length.greaterThan', 0)
    }

    // Check the check-in field shows the day we selected
    verifyCheckInDateSelected(day) {
        cy.get('.react-datepicker__input-container').eq(0).find('input')
            .invoke('val').should('include', day.toString())
    }

    // Check the check-out field shows the day we selected
    verifyCheckOutDateSelected(day) {
        cy.get('.react-datepicker__input-container').eq(1).find('input')
            .invoke('val').should('include', day.toString())
    }
}

export default new DateSearchPage()
