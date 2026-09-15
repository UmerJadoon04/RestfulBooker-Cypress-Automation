/// <reference types="cypress" />
import dateSearchPage from '../support/pages/dateSearchPage'

describe('Check-in and Check-out Date Search', () => {
    it('should let a user search rooms using tomorrow and a few days later as dates', () => {
        const today = new Date()

        const checkIn = new Date(today)
        checkIn.setDate(today.getDate() + 1)

        const checkOut = new Date(today)
        checkOut.setDate(today.getDate() + 3)

        const checkInDay = checkIn.getDate()
        const checkOutDay = checkOut.getDate()

        cy.visit('https://automationintesting.online/#booking')
        dateSearchPage.goToBookingSection()

        dateSearchPage.selectCheckInDay(checkInDay)
        dateSearchPage.selectCheckOutDay(checkOutDay)
        dateSearchPage.searchRooms()

        dateSearchPage.verifySearchResultsShown()
        dateSearchPage.verifyCheckInDateSelected(checkInDay)
        dateSearchPage.verifyCheckOutDateSelected(checkOutDay)
    })
})
