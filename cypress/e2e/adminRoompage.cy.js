/// <reference types="cypress" />
import adminPage from '../support/pages/adminPage'
import adminRoomsPage from '../support/pages/adminRoomsPage'
import roomApi from '../support/api/roomApi'

describe('Admin Rooms Page', () => {
    it('should let an admin create, update, and delete a room', () => {
        cy.fixture('adminData').then((adminData) => {
            cy.fixture('roomData').then((roomData) => {
                // Give this room a unique name every run, so this test never
                // depends on leftover data from a previous run
                const room = { ...roomData.newRoom, roomName: `Room-${Date.now()}` }

                // Log in
                adminPage.visit()
                adminPage.login(adminData.validAdmin)

                // Create the room
                adminRoomsPage.createRoom(room)
                adminRoomsPage.verifyRoomExists(room.roomName)

                // Look up the real ID the server just gave this room,
                // instead of guessing/hardcoding one
                roomApi.getRoomList().then((response) => {
                    const createdRoom = roomApi.findRoomByName(response.body.rooms, room.roomName)
                    expect(createdRoom).to.exist
                    const roomId = createdRoom.roomid

                    // Update the room using its real ID
                    adminRoomsPage.openRoom(roomId)
                    adminRoomsPage.openEditForm()
                    adminRoomsPage.updateRoomWifiAndPrice(room.updatedPrice)
                    adminRoomsPage.backToRoomsList()
                    adminRoomsPage.verifyUpdatedPrice(room.updatedPrice, room.updatedPrice)

                    // Delete the room using its real ID
                    adminRoomsPage.deleteRoom(roomId)
                    adminRoomsPage.verifyRoomDeleted(roomId)
                })
            })
        })
    })
})