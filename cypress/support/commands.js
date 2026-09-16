Cypress.Commands.add('visitHomepage', () => {
  cy.visit('https://automationintesting.online/')
})
 
Cypress.Commands.add('getHeroTitle', () => {
  return cy.get('h1.display-4')
})
 
Cypress.Commands.add('getBookingCardTitle', () => {
  return cy.get('h3.card-title')
})
 
Cypress.Commands.add('getBookingSection', () => {
  return cy.get('div.row.g-3')
})
 
Cypress.Commands.add('getRoomsHeading', () => {
  return cy.get('#rooms h2.display-5')
})
 
Cypress.Commands.add('getRoomsSection', () => {
  return cy.get('div.row.g-4')
})
 
Cypress.Commands.add('getLocationHeading', () => {
  return cy.get('#location h2.display-5')
})
 
Cypress.Commands.add('getLocationInfoCard', () => {
  return cy.get('#location > .container > .row > :nth-child(2) > .card > .card-body')
})
 
Cypress.Commands.add('getMapMarker', () => {
  return cy.get('.pigeon-overlays')
})
 
Cypress.Commands.add('getContactCard', () => {
  return cy.get('.col-lg-8 .card-body.p-4')
})
 
Cypress.Commands.add('getFooter', () => {
  return cy.get('footer')
})

// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
