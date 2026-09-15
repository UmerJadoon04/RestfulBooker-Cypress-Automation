/// <reference types="cypress" />
import homePage from '../support/pages/homePage'
import roomsPage from '../support/pages/roomsPage'

describe('Room Listing', () => {
    it('should display each room with the correct type, facilities, and price', () => {
        cy.fixture('roomData').then((roomData) => {
            homePage.visit()
            roomsPage.verifyRoomImagesVisible()
            roomsPage.verifyRoomTypes(roomData.roomTypes)
            roomsPage.verifyRoomFacilities(roomData.facilities)
            roomsPage.verifyRoomPrices(roomData.prices)
        })
    })
})