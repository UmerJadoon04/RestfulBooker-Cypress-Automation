// cypress/support/pages/locationPage.js
// This file holds every action and check for the Location/Map section.

class LocationPage {

    visit() {
        cy.visit('https://automationintesting.online/#location')
    }

    // Check the map tiles and click layer are visible
    verifyMapIsVisible() {
        cy.get('.pigeon-tiles-box').should('be.visible')
        cy.get('.pigeon-click-block').should('be.visible')
    }

    // Check the required map attribution links are shown
    verifyMapAttribution() {
        cy.contains('Pigeon').should('be.visible')
        cy.contains('OpenStreetMap').should('be.visible')
    }
}

export default new LocationPage()