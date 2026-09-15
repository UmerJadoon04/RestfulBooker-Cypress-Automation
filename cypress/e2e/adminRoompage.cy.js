/// <reference types="cypress" />
import adminPage from '../support/pages/adminPage'
import adminRoomsPage from '../support/pages/adminRoomsPage'

describe('Admin Rooms Page', () => {
    it('should let an admin create, update, and delete a room', () => {
        cy.fixture('adminData').then((adminData) => {
            cy.fixture('roomData').then((roomData) => {
                const room = roomData.newRoom

                // Log in
                adminPage.visit()
                adminPage.login(adminData.validAdmin)
                cy.url().should('include', '/admin')

                // Create the room
                adminRoomsPage.createRoom(room)
                adminRoomsPage.verifyRoomExists(room.roomName)

                // Update the room
                adminRoomsPage.openRoom(4)
                adminRoomsPage.openEditForm()
                adminRoomsPage.updateRoomWifiAndPrice(room.updatedPrice)
                adminRoomsPage.backToRoomsList()
                adminRoomsPage.verifyUpdatedPrice(room.updatedPrice, room.updatedPrice)

                // Delete the room
                adminRoomsPage.deleteRoom(4)
                adminRoomsPage.verifyRoomDeleted(4)
            })
        })
    })
})