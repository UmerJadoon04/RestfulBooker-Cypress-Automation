/// <reference types="cypress" />
import authApi from '../support/api/authApi'

describe('API Authentication', () => {

    it('should let a user log in with valid credentials and receive a token', () => {
        cy.fixture('adminData').then((adminData) => {
            authApi.login(adminData.validAdmin).then((response) => {
                expect(response.status).to.equal(200)
                expect(response.body).to.have.property('token')
                expect(response.body.token).to.be.a('string')
                expect(response.body.token.length).to.be.greaterThan(0)
            })
        })
    })

    it('should reject login with the wrong password', () => {
        cy.fixture('adminData').then((adminData) => {
            authApi.login(adminData.wrongPasswordAdmin).then((response) => {
                expect(response.status).to.equal(401)
            })
        })
    })

    it('should reject login with a username that does not exist', () => {
        cy.fixture('adminData').then((adminData) => {
            authApi.login(adminData.nonExistentAdmin).then((response) => {
                expect(response.status).to.equal(401)
            })
        })
    })

    it('should reject login with an empty body', () => {
        authApi.login({}).then((response) => {
            expect(response.status).to.equal(401)
        })
    })
})