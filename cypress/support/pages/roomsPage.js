class RoomsPage {

    // Check that exactly 3 room images are visible
    verifyRoomImagesVisible() {
        cy.get('.room-image').should('be.visible').and('have.length', 3)
    }

    // Check every room's type text matches one of the valid room types
    verifyRoomTypes(validRoomTypes) {
        cy.get('h5.card-title').each(($el) => {
            const text = $el.text().trim()
            expect(validRoomTypes).to.include(text)
        })
    }

    // Check every listed facility matches one of the valid facilities
    verifyRoomFacilities(validFacilities) {
        cy.get('span.text-dark').should('have.length', 9).each(($el) => {
            const text = $el.text().trim()
            expect(validFacilities).to.include(text)
        })
    }

    // Check every listed price matches one of the valid prices
    verifyRoomPrices(validPrices) {
        cy.get('.fw-bold.fs-5').each(($el) => {
            const text = $el.text().trim()
            expect(validPrices).to.include(text)
        })
    }
}

export default new RoomsPage()