/// <reference types="cypress" />
import adminPage from '../support/pages/adminPage'
import adminRoomsPage from '../support/pages/adminRoomsPage'
import roomApi from '../support/api/roomApi'

describe('Admin Rooms Page', () => {
    it('should let an admin create, update, and delete a room', () => {
        cy.fixture('adminData').then((adminData) => {
            cy.fixture('roomData').then((roomData) => {
                const room = { ...roomData.newRoom, roomName: `Room-${Date.now()}` }

                adminPage.visit()
                adminPage.login(adminData.validAdmin)

                adminRoomsPage.createRoom(room)
                adminRoomsPage.verifyRoomExists(room.roomName)

                roomApi.getRoomList().then((response) => {
                    const createdRoom = roomApi.findRoomByName(response.body.rooms, room.roomName)
                    expect(createdRoom).to.exist
                    const roomId = createdRoom.roomid

                    // Refresh the admin rooms page so the newly created room
                    // actually appears in the visible list before we try to click it
                    cy.visit('https://automationintesting.online/admin/rooms')

                    adminRoomsPage.openRoom(roomId)
                    adminRoomsPage.openEditForm()
                    adminRoomsPage.updateRoomWifiAndPrice(room.updatedPrice)
                    adminRoomsPage.backToRoomsList()
                    adminRoomsPage.verifyUpdatedPrice(room.updatedPrice, room.updatedPrice)

                    adminRoomsPage.deleteRoom(roomId)
                    adminRoomsPage.verifyRoomDeleted(roomId)
                })
            })
        })
    })
})