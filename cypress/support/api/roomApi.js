// cypress/support/api/roomApi.js
// Plain-English helper functions for the room API.
// A test just calls these - it never writes raw cy.request() itself.

const roomUrl = 'https://automationintesting.online/api/room'

class RoomApi {

    // Get the full list of rooms (no login needed - this is public)
    getRoomList() {
        return cy.request({
            method: 'GET',
            url: roomUrl,
            failOnStatusCode: false
        })
    }

    // Get one specific room by its id
    getRoomById(roomId) {
        return cy.request({
            method: 'GET',
            url: `${roomUrl}/${roomId}`,
            failOnStatusCode: false
        })
    }

    // Create a room. Pass a token if you want to be logged in, or leave it blank to test as a guest
    createRoom(roomBody, token) {
        return cy.request({
            method: 'POST',
            url: roomUrl,
            headers: token ? { Cookie: `token=${token}` } : {},
            body: roomBody,
            failOnStatusCode: false
        })
    }

    // Send genuinely broken JSON text when creating a room (for testing bad input handling)
    createRoomWithBrokenJson(brokenJsonText, token) {
        return cy.request({
            method: 'POST',
            url: roomUrl,
            body: brokenJsonText,
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Cookie: `token=${token}` } : {})
            },
            failOnStatusCode: false
        })
    }

    // Update a room. Pass a token if you want to be logged in, or leave it blank to test as a guest
    updateRoom(roomId, roomBody, token) {
        return cy.request({
            method: 'PUT',
            url: `${roomUrl}/${roomId}`,
            headers: token ? { Cookie: `token=${token}` } : {},
            body: roomBody,
            failOnStatusCode: false
        })
    }

    // Delete a room. Pass a token if you want to be logged in, or leave it blank to test as a guest
    deleteRoom(roomId, token) {
        return cy.request({
            method: 'DELETE',
            url: `${roomUrl}/${roomId}`,
            headers: token ? { Cookie: `token=${token}` } : {},
            failOnStatusCode: false
        })
    }

    // Check whether a room with the given name exists anywhere in the room list
    findRoomByName(roomList, roomName) {
        return roomList.find((room) => room.roomName === roomName)
    }
}

export default new RoomApi()