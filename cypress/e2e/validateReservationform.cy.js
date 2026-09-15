/// <reference types="cypress" />
import reservationPage from '../support/pages/reservationPage'

describe('Reservation Form Validation', () => {
    it('should show an error for every required field left empty', () => {
        cy.visit('https://automationintesting.online/#booking')
        reservationPage.openFirstRoom()
        reservationPage.openReservationForm()
        reservationPage.submitReservation()
        reservationPage.verifyRequiredFieldErrors()
    })

    it('should confirm the booking when all fields are filled in correctly', () => {
        cy.fixture('guestData').then((guestData) => {
            cy.visit('https://automationintesting.online/#booking')
            reservationPage.openFirstRoom()
            reservationPage.openReservationForm()
            reservationPage.fillGuestDetails(guestData.validGuest)
            reservationPage.submitReservation()
            reservationPage.verifyBookingConfirmed()
        })
    })
})