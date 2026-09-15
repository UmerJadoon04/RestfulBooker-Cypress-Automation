/// <reference types="cypress" />
import homePage from '../support/pages/homePage'

describe('Homepage', () => {
    it('should display all key sections of the homepage', () => {
        homePage.visit()
        homePage.verifyHeroTitle()
        homePage.verifyBookingSection()
        homePage.verifyRoomsSection()
        homePage.verifyLocationSection()
        homePage.verifyContactSection()
        homePage.verifyFooter()
    })
})