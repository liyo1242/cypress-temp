import orderCreatePageFactory from '../../support/OrderCreatePage'
import orderDetailPageFactory from '../../support/OrderDetailPage'
import orderListPageFactory from '../../support/OrderListPage'

describe('Resolve Order', () => {
  const orderCreatePage = orderCreatePageFactory()
  const orderDetailPage = orderDetailPageFactory()
  const orderListPage = orderListPageFactory()
  const orderDummyData = {
    title: 'Resolve Order Example',
    desc: 'This is order desc',
    engineer: 'engineer-li'
  }

  before(() => {
    cy.loginHouseKeeper()
    orderCreatePage.enterOrderCreatePage()
    orderCreatePage.fillOrderData(orderDummyData)
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('loginToken', 'ASP.NET_SessionId')
  })

  it('enter order detail page', () => {
    orderListPage.enterOrderListPage()
    orderListPage.enterOrderDetailByTitle(orderDummyData.title)
  })

  it('resolve order', () => {
    orderDetailPage.resolveOrder()
  })

  after(() => {
    // * delete the order
  })
})
