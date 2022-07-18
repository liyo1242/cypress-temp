// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-localstorage-commands'
import 'cypress-file-upload'

Cypress.Commands.add('mockGeolocation', (latitude = 24.1547, longitude = 120.6443) => {
  cy.window().then(($window) => {
    cy.stub($window.navigator.geolocation, 'getCurrentPosition', (callback) => {
      return callback({ coords: { latitude, longitude } })
    })
  })
})

Cypress.Commands.add('loginWebApp', (username = Cypress.env('USERNAME'), password = Cypress.env('PASSWORD')) => {
  cy.visit(Cypress.env('TEST_APP_URL'))
  cy.get('[data-cy="login-username"]').type(username)
  cy.get('[data-cy="login-password"]').type(password)
  cy.get('[data-cy="login"]').click()
})

// * selectors 是陣列
Cypress.Commands.add(
  'runRadioTest',
  (selectors, defaultActiveIndex = 0, activeAttr = 'aria-checked') => {
    cy.wrap(selectors).each((selector) => {
      cy.get(selector).click()
      cy.get(selector).should('have.attr', activeAttr).and('equal', 'true')
      cy.wrap(selectors.filter((s) => s !== selector)).each((restSelector) => {
        cy.get(restSelector).should('not.have.attr', 'aria-checked')
      })
    })

    // * 測完了要還原
    cy.wait(3000)
    cy.get(selectors[defaultActiveIndex]).click()
  }
)

Cypress.Commands.add('runCheckBoxTest', (selectors, defaultActiveIndex = [0]) => {
  cy.wrap(selectors.filter((_, i) => defaultActiveIndex.includes(i))).each((restSelector) => {
    // * 先把預設點擊的點掉
    cy.get(selector).click()
  })

  cy.wrap(selectors).each((selector) => {
    cy.get(selector).should('not.have.class', 'is-checked')
  })

  cy.wrap(selectors).each((selector) => {
    // * 全部點開
    cy.get(selector).click()
  })

  cy.wrap(selectors).each((selector) => {
    cy.get(selector).should('have.class', 'is-checked')
  })

  cy.wrap(selectors).each((selector) => {
    // * 全部點掉
    cy.get(selector).click()
  })

  cy.wrap(selectors.filter((_, i) => defaultActiveIndex.includes(i))).each((restSelector) => {
    // * 把預設點擊的點回來
    cy.get(selector).click()
  })
})
