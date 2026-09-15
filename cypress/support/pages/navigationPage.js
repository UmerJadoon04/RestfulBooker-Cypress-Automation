class NavigationPage {

    // Click the "Rooms" link and check it lands on the Rooms section
    goToRoomsAndVerify() {
        cy.get('a[href="/#rooms"]').click()
        cy.get('h2.display-5').should('contain', 'Our Rooms')
    }

    // Click the "Booking" link and check the booking box shows up
    goToBookingAndVerify() {
        cy.get('a[href="/#booking"]').click()
        cy.get('#booking .container').should('be.visible')
    }

    // Click the "Location" link and check the map marker shows up
    goToLocationAndVerify() {
        cy.get('a[href="/#location"]').click()
        cy.get('.pigeon-overlays').should('be.visible')
    }

    // Click the "Contact" link and check the contact card shows up
    goToContactAndVerify() {
        cy.get('a[href="/#contact"]').click()
        cy.get('.col-lg-8 > .card > .card-body').should('be.visible')
    }

    // Click the "Admin" link and check the login form shows up
    goToAdminAndVerify() {
        cy.get('.nav-link[href="/admin"]').click()
        cy.get('form').should('be.visible')
    }
}

export default new NavigationPage()