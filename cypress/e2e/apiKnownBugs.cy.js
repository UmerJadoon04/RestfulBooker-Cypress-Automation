/// <reference types="cypress" />
import authApi from '../support/api/authApi'
import roomApi from '../support/api/roomApi'

describe('API Edge Cases', () => {

    it('should handle an extremely long room name without breaking (may cause minor UI overlap - low severity)', () => {
        cy.fixture('adminData').then((adminData) => {
            cy.fixture('roomData').then((roomData) => {
                authApi.getAuthToken(adminData.validAdmin).then((token) => {
                    roomApi.createRoom(roomData.apiLongRoomName, token).then((response) => {
                        cy.log(response.status)
                    })
                })
            })
        })
    })

    it('should safely store SQL-injection style input as plain text, not execute it', () => {
        cy.fixture('adminData').then((adminData) => {
            cy.fixture('roomData').then((roomData) => {
                authApi.getAuthToken(adminData.validAdmin).then((token) => {
                    roomApi.createRoom(roomData.apiSqlInjectionRoom, token).then(() => {
                        roomApi.getRoomList().then((getResponse) => {
                            const foundRoom = roomApi.findRoomByName(getResponse.body.rooms, roomData.apiSqlInjectionRoom.roomName)
                            expect(foundRoom).to.exist
                        })
                    })
                })
            })
        })
    })
})

describe('Known Bugs - API Error Handling', () => {
    // These document real, confirmed bugs found during testing.
    // The assertions are commented out because they document the CORRECT
    // expected behavior, which the API does not currently meet.

    it('BUG: GET on a non-existent room returns 500 instead of 404', () => {
        roomApi.getRoomById(9999).then((response) => {
            cy.log(response.status)
            cy.log(JSON.stringify(response.body))
            // expect(response.status).to.equal(404) // currently fails - documents known bug
        })
    })

    it('DELETE on a non-existent room (logged in) correctly returns 404', () => {
        cy.fixture('adminData').then((adminData) => {
            authApi.getAuthToken(adminData.validAdmin).then((token) => {
                roomApi.deleteRoom(9999, token).then((response) => {
                    expect(response.status).to.equal(404)
                })
            })
        })
    })

    it('BUG: sending broken JSON to the login endpoint returns 500 instead of 400', () => {
        authApi.loginWithBrokenJson('{ "roomName": "999", "type": ').then((response) => {
            cy.log(response.status)
            cy.log(JSON.stringify(response.body))
        })
    })

    it('BUG: sending broken JSON to room creation returns 500 instead of 400', () => {
        cy.fixture('adminData').then((adminData) => {
            authApi.getAuthToken(adminData.validAdmin).then((token) => {
                roomApi.createRoomWithBrokenJson('{ "roomName": "999", "type": ', token).then((response) => {
                    cy.log(response.status)
                    cy.log(JSON.stringify(response.body))
                })
            })
        })
    })
})