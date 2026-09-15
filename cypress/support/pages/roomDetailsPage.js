class RoomDetailsPage {

    // Check the room name, accessibility badge, guest limit, and hero image
    verifyRoomDetails() {
        cy.get('.fw-bold.mb-2').should('contain', 'Single Room')
        cy.get('.badge.bg-success').should('contain', 'Accessible')
        cy.get('div.text-muted').should('contain', ' Max 2 Guests')
        cy.get('div.col-12 .hero-image').should('be.visible')
    }

    // Check the TV, WiFi, and Safe amenity icons are visible
    verifyAmenities() {
        cy.get('.bi.bi-tv.amenity-icon.me-3').should('be.visible')
        cy.get('.bi.bi-wifi.amenity-icon.me-3').should('be.visible')
        cy.get('.bi.bi-safe.amenity-icon.me-3').should('be.visible')
    }

    // Check the check-in/check-out times are shown correctly
    verifyCheckInCheckOutTimes() {
        cy.get('div.mb-4 h2.fs-4.fw-bold.mb-3').should('contain', 'Room Policies')
        cy.get('h3.fs-5.mb-3').should('contain', 'Check-in & Check-out')
        cy.contains('strong', 'Check-in').parent().should('contain', '3:00 PM - 8:00 PM')
        cy.contains('strong', 'Check-out').parent().should('contain', 'By 11:00 AM')
        cy.contains('strong', 'Early/Late').parent().should('contain', 'By arrangement')
        cy.get('.fs-5.mb-3').should('contain', 'House Rules')
    }

    // Check every house rule shows the correct icon (smoking, parties, pets, etc.)
    verifyHouseRulePolicies(policies) {
        policies.forEach((policy) => {
            cy.contains('div', policy.text).parent().find('i')
                .should('have.class', policy.icon)
        })
    }

    // Click a specific day on the booking calendar
    selectCalendarDay(day) {
        cy.contains('.rbc-button-link', day).click()
    }

    // Check the price breakdown line for the selected number of nights
    verifyNightlyPriceLine(priceLineText) {
        cy.contains('div', priceLineText).should('be.visible')
    }

    // Check the total price adds up correctly (room cost + cleaning fee + service fee)
    verifyTotalPrice(expectedTotal) {
        cy.contains('div.fw-bold', 'Total').find('span').eq(1).invoke('text').then((text) => {
            const total = parseInt(text.replace('£', ''))
            expect(total).to.equal(expectedTotal)
        })
    }

    // Check the "Similar Rooms" section shows the correct room types and prices
    verifySimilarRooms(validTypes, validPrices) {
        cy.get('.card.border-0.shadow.booking-card').should('be.visible')

        cy.contains('h2.fs-4.fw-bold.mb-4', 'Similar Rooms You Might Like')
            .parent()
            .find('.card.border-0.shadow-sm.h-100')
            .should('have.length', 2)
            .each(($room) => {
                const type = $room.find('h3.card-title').text().trim()
                expect(validTypes).to.include(type)

                const priceValue = $room.find('.fw-bold.text-primary').text().trim()
                const priceUnit = $room.find('small.text-muted').last().text().trim()
                const fullPrice = `${priceValue}${priceUnit}`

                expect(validPrices).to.include(fullPrice)
            })
    }
}

export default new RoomDetailsPage()
