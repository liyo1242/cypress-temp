import orderCreatePageFactory from '../../support/OrderCreatePage'

describe('Create Order', () => {
  const orderCreatePage = orderCreatePageFactory()

  before(() => {
    cy.loginHouseKeeper()
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('loginToken', 'ASP.NET_SessionId')
  })

  it('enter create order page', () => {
    orderCreatePage.enterOrderCreatePage()
  })

  it('create order by data', () => {
    const orderDummyData = {
      title: 'My First Order',
      desc: 'This is order desc',
      engineer: 'engineer-li'
    }
    orderCreatePage.fillOrderData(orderDummyData)
  })

  after(() => {
    // * delete the order
  })
})
