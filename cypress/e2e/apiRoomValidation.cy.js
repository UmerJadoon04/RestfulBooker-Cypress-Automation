/// <reference types="cypress" />
import authApi from '../support/api/authApi'
import roomApi from '../support/api/roomApi'

describe('API Room Access Control (no login)', () => {

    it('should reject room creation with no login', () => {
        cy.fixture('roomData').then((roomData) => {
            roomApi.createRoom(roomData.apiValidRoom).then((response) => {
                expect(response.status).to.be.oneOf([401, 403])
            })
        })
    })

    it('should reject room deletion with no login', () => {
        roomApi.deleteRoom(1).then((response) => {
            expect(response.status).to.be.oneOf([401, 403])
        })
    })

    it('should reject room update with no login', () => {
        cy.fixture('roomData').then((roomData) => {
            roomApi.updateRoom(1, roomData.apiUpdateNoAuth).then((response) => {
                expect(response.status).to.equal(403)
            })
        })
    })
})

describe('API Room Payload Validation (logged in)', () => {

    it('should reject a room with no roomName', () => {
        cy.fixture('adminData').then((adminData) => {
            cy.fixture('roomData').then((roomData) => {
                authApi.getAuthToken(adminData.validAdmin).then((token) => {
                    roomApi.createRoom(roomData.apiMissingRoomName, token).then((response) => {
                        expect(response.status).to.equal(400)
                    })
                })
            })
        })
    })

    it('should reject a room with the wrong data type for price', () => {
        cy.fixture('adminData').then((adminData) => {
            cy.fixture('roomData').then((roomData) => {
                authApi.getAuthToken(adminData.validAdmin).then((token) => {
                    roomApi.createRoom(roomData.apiWrongPriceType, token).then((response) => {
                        expect(response.status).to.equal(400)
                    })
                })
            })
        })
    })

    it('should reject an empty room body', () => {
        cy.fixture('adminData').then((adminData) => {
            authApi.getAuthToken(adminData.validAdmin).then((token) => {
                roomApi.createRoom({}, token).then((response) => {
                    expect(response.status).to.equal(400)
                })
            })
        })
    })

    it('should safely ignore an extra unexpected field', () => {
        cy.fixture('adminData').then((adminData) => {
            cy.fixture('roomData').then((roomData) => {
                authApi.getAuthToken(adminData.validAdmin).then((token) => {
                    roomApi.createRoom(roomData.apiExtraField, token).then((response) => {
                        expect(response.status).to.be.oneOf([200, 201])
                    })
                })
            })
        })
    })

    it('should reject a negative room price', () => {
        cy.fixture('adminData').then((adminData) => {
            cy.fixture('roomData').then((roomData) => {
                authApi.getAuthToken(adminData.validAdmin).then((token) => {
                    roomApi.createRoom(roomData.apiNegativePrice, token).then((response) => {
                        expect(response.status).to.equal(400)
                    })
                })
            })
        })
    })
})

describe('API Room CRUD Persistence (logged in)', () => {

    it('should create a room and confirm it appears in the room list', () => {
        cy.fixture('adminData').then((adminData) => {
            cy.fixture('roomData').then((roomData) => {
                authApi.getAuthToken(adminData.validAdmin).then((token) => {
                    roomApi.createRoom(roomData.apiCreateThenVerify, token).then(() => {
                        roomApi.getRoomList().then((getResponse) => {
                            expect(getResponse.body.rooms).to.be.an('array')
                            const foundRoom = roomApi.findRoomByName(getResponse.body.rooms, roomData.apiCreateThenVerify.roomName)
                            expect(foundRoom).to.exist
                        })
                    })
                })
            })
        })
    })

    it('should return 404 both times when deleting the same room twice', () => {
        cy.fixture('adminData').then((adminData) => {
            authApi.getAuthToken(adminData.validAdmin).then((token) => {
                roomApi.deleteRoom(3, token).then(() => {
                    roomApi.deleteRoom(3, token).then((response) => {
                        expect(response.status).to.equal(404)
                    })
                })
            })
        })
    })
})