class ReservationPage {

    // Open the first room's reservation page
    openFirstRoom() {
        cy.get(':nth-child(1) > .card > .card-footer > .btn').click()
    }

    // Click the button that opens the reservation form
    openReservationForm() {
        cy.get('#doReservation').click()
    }

    // Click the final submit button on the reservation form
    submitReservation() {
        cy.get('.btn.btn-primary.w-100.mb-3').click()
    }

    // Fill in the guest details with the given information
    fillGuestDetails(guest) {
        cy.get('input[name="firstname"]').type(guest.firstname)
        cy.get('input[name="lastname"]').type(guest.lastname)
        cy.get('input[name="email"]').type(guest.email)
        cy.get('input[name="phone"]').type(guest.phone)
    }

    // Check that all the "field is required" error messages are shown correctly
    verifyRequiredFieldErrors() {
        cy.get('.alert.alert-danger').should('contain', 'Firstname should not be blank')
            .and('contain', 'size must be between 3 and 18')
        cy.get('.alert.alert-danger').should('contain', 'Lastname should not be blank')
            .and('contain', 'size must be between 3 and 30')
        cy.get('.alert.alert-danger').should('contain', 'must not be empty')
        cy.get('.alert.alert-danger').should('contain', 'must not be empty')
            .and('contain', 'size must be between 11 and 21')
    }

    // Check that the booking confirmation message appears
    verifyBookingConfirmed() {
        cy.contains('Booking Confirmed').should('exist')
        //cy.contains('Booking Confirmed').should('be.visible')
    }
}

export default new ReservationPage()