/// <reference types="cypress" />
import homePage from '../support/pages/homePage'
import navigationPage from '../support/pages/navigationPage'
 
describe('Navigation Menu', () => {
    it('should take the user to the correct section for each menu link', () => {
        homePage.visit()
        navigationPage.goToRoomsAndVerify()
        navigationPage.goToBookingAndVerify()
        navigationPage.goToLocationAndVerify()
        navigationPage.goToContactAndVerify()
        navigationPage.goToAdminAndVerify()
    })
})