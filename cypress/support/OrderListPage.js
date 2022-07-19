/**
 * OrderListPage
 */
 export default (_) => ({
  elements: {
    orderList: '[data-cy="order-list"]',
    detailPathButton: '[data-cy="enter-orderDetail"]',
  },
  isEnterOrderListPage() {
    cy.hash().should('match', /^(\/Order\/)/)
  },
  enterOrderListPage() {
    cy.visit('/Order')
  },
  enterOrderDetailByTitle(title) {
    cy.get(this.elements.orderList).within(() => {
      cy.contains(title).parent('li').within(() => {
        cy.get(this.elements.detailPathButton).click()
      })
    })
  },
  checkOrderIsExistedByTitle(title) {
    cy.get(this.elements.orderList).within(() => {
      cy.contains(title)
    })
  }
})
