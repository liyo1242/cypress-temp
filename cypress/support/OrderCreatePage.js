/**
 * OrderCreatePage
 */
 export default (_) => ({
  elements: {
    submitButton: '[data-cy="create-order"]',
    descInput: '[data-cy="order-desc"]',
    titleInput: '[data-cy="order-title"]',
    engineerSelect: '[data-cy="order-engineer"]',
    engineerSelectItems: '[data-cy="order-engineer-item"]',
    actionToast: '[data-cy="order-action-toast"]'
  },
  isEnterOrderCreatePage() {
    cy.hash().should('match', /^(\/Order\/Create\/)/)
  },
  enterOrderCreatePage() {
    cy.visit('/Order/Create')
  },
  fillOrderData({ desc, title, engineer }) {
    cy.get(this.elements.descInput).type(desc)
    cy.get(this.elements.titleInput).type(title)
    this.chooseEngineerSelect(engineer)
    cy.get(this.elements.submitButton).click()
    cy.get(this.elements.actionToast).should('have.text', 'Create Successful')
  },
  chooseEngineerSelect(engineerName) {
    cy.get(this.elements.engineerSelect).click()
    cy.get(this.elements.engineerSelectItems).contains(engineerName).click()
  }
})
