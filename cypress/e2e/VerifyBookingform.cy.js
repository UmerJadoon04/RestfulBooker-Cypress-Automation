/// <reference types="cypress" />
import roomDetailsPage from '../support/pages/roomDetailsPage'

describe('Room Reservation Page', () => {
    beforeEach(() => {
        cy.visit('https://automationintesting.online/#booking')
        cy.get(':nth-child(1) > .card > .card-footer > .btn').click()
    })

    it('should display correct room details', () => {
        roomDetailsPage.verifyRoomDetails()
    })

    it('should display correct amenities', () => {
        roomDetailsPage.verifyAmenities()
    })

    it('should display correct room policies and check-in/check-out times', () => {
        cy.fixture('roomData').then((roomData) => {
            roomDetailsPage.verifyCheckInCheckOutTimes()
            roomDetailsPage.verifyHouseRulePolicies(roomData.policies)
        })
    })

    it('should calculate total price correctly after selecting a date', () => {
        roomDetailsPage.selectCalendarDay('06')
        roomDetailsPage.verifyNightlyPriceLine('£100 x 1 nights')
        roomDetailsPage.verifyTotalPrice(100 + 25 + 15)
    })

    it('should display similar rooms with correct type and price', () => {
        cy.fixture('roomData').then((roomData) => {
            roomDetailsPage.verifySimilarRooms(roomData.similarRoomTypes, roomData.similarRoomPrices)
        })
    })
})