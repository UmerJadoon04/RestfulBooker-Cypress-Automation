class AdminRoomsPage {

    // Fill in the new room form and create it
    createRoom(room) {
        cy.get('#roomName').type(room.roomName)
        cy.get('#type').select(room.type)
        cy.get('#accessible').select(room.accessible)
        cy.get('#roomPrice').type(room.price)
        cy.get('#tvCheckbox').check().should('be.checked')
        cy.get('#safeCheckbox').check().should('be.checked')
        cy.get('#radioCheckbox').check().should('be.checked')
        cy.get('#createRoom').click()
    }

    // Check the newly created room's name shows up in the list
    verifyRoomExists(roomName) {
        cy.contains(roomName).should('be.visible')
    }

    // Open a room from the list to edit it
    openRoom(roomId) {
        cy.get(`#room${roomId}`).click()
    }

    // Click the edit button on the open room
    openEditForm() {
        cy.get('.btn.btn-outline-primary.float-sm-end').click()
    }

    // Add WiFi and change the price, then save the update
    updateRoomWifiAndPrice(newPrice) {
        cy.get('#wifiCheckbox').check().should('be.visible').and('be.checked')
        cy.get('#roomPrice').clear().type(newPrice)
        cy.get('#update').click()
    }

    // Go back to the rooms list
    backToRoomsList() {
        cy.get('a[href="/admin/rooms"]').click()
    }

    // Check the updated price shows correctly in the list
    verifyUpdatedPrice(priceId, expectedPrice) {
        cy.get(`#roomPrice${priceId}`).should('contain', expectedPrice)
    }

    // Delete a room by its ID
    deleteRoom(roomId) {
        cy.get(`#${roomId}`).click()
    }

    // Check a room no longer exists in the list
    verifyRoomDeleted(roomId) {
        cy.get(`#room${roomId}`).should('not.exist')
    }
}

export default new AdminRoomsPage()
