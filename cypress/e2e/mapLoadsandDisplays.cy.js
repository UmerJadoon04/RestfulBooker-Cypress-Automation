/// <reference types="cypress" />
import locationPage from '../support/pages/locationPage'

describe('Map', () => {
    it('should load and display correctly with proper attribution', () => {
        locationPage.visit()
        locationPage.verifyMapIsVisible()
        locationPage.verifyMapAttribution()
    })

    it('should stay visible and usable across different screen sizes', () => {
        cy.fixture('screenSizes').then((data) => {
        data.screenSizes.forEach((size) => {
        cy.viewport(size.width, size.height)
        locationPage.visit()
        locationPage.verifyMapIsVisible()
            })
        })
    })
})