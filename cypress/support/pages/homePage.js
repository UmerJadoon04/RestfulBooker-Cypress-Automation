class HomePage {

    // Go to the homepage
    visit() {
        cy.visit('https://automationintesting.online/')
    }

    // Check the main hero title shows the hotel name
    verifyHeroTitle() {
        cy.get('h1.display-4').should('contain', 'Shady Meadows B&B')
    }

    // Check the booking section title and box are visible
    verifyBookingSection() {
        cy.get('h3.card-title').should('contain', 'Check Availability & Book Your Stay')
        cy.get('div.row.g-3').should('be.visible')
    }

    // Check the rooms section heading and box are visible
    verifyRoomsSection() {
        cy.get('#rooms h2.display-5').should('contain', 'Our Rooms')
        cy.get('div.row.g-4').should('be.visible')
    }

    // Check the location section, its info card, and the map marker
    verifyLocationSection() {
        cy.get('#location h2.display-5').should('contain', 'Our Location')
        cy.get('#location > .container > .row > :nth-child(2) > .card > .card-body').should('be.visible')
        cy.get('.pigeon-overlays').should('be.visible')
    }

    // Check the contact card is visible
    verifyContactSection() {
        cy.get('.col-lg-8 .card-body.p-4').should('be.visible')
    }

    // Check the footer is visible
    verifyFooter() {
        cy.get('footer').should('be.visible')
    }
    // Check the navigation bar and room images are visible
    verifyNavAndRoomsVisible() {
        cy.get('nav').should('be.visible')
        cy.get('.room-image').should('be.visible')
    }

}

export default new HomePage()
