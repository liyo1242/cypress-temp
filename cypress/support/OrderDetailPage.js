/**
 * OrderDetailPage
 */
 export default (_) => ({
  elements: {
    cancelButton: '[data-cy="cancel-order"]',
    resolveButton: '[data-cy="resolve-order"]',
    finishButton: '[data-cy="finish-order"]',
    actionToast: '[data-cy="order-action-toast"]'
  },
  isEnterOrderDetailPage() {
    cy.hash().should('match', /^(\/Order\/Detail\/)(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})/)
  },
  cancelOrder() {
    cy.get(this.elements.cancelButton).click()
    cy.get(this.elements.actionToast).should('have.text', 'Cancel Successful')
  },
  resolveOrder() {
    cy.get(this.elements.resolveButton).click()
    cy.get(this.elements.actionToast).should('have.text', 'Resolve Successful')
  },
  finishOrder() {
    cy.get(this.elements.finishButton).click()
    cy.get(this.elements.actionToast).should('have.text', 'Finish Successful')
  }
})
