import { LoginPage } from './loginPage'

export class DashboardPage {
  
  loginPage = new LoginPage()

  apiWait(prefix, expectedStatus = 200) {
    cy.wait(`@${prefix}`)
      .its('response.statusCode')
      .should('eq', expectedStatus)
  }

  apiProfile() {
    const prefix = 'profileAPI'
    cy.intercept('GET', '**/api/v2/pim/employees/**').as(prefix)
    return prefix
  }

  loginAsValidUser(username, password) {
    const authAlias = this.loginPage.authValidate()
    const dashboardAlias = this.loginPage.apiDashboard()
  
    this.loginPage.inputUsername(username)
    this.loginPage.inputPassword(password)
    this.loginPage.clickLogin()

    this.apiWait(authAlias, 302)
    this.apiWait(dashboardAlias, 200)

    cy.url().should('include', '/dashboard')
    cy.contains('Dashboard').should('be.visible')
  }

  viewProfile() {
    const profileAlias = this.apiProfile()

    cy.get('span.oxd-main-menu-item--name')
      .contains('My Info')
      .click()

    this.apiWait(profileAlias)  
  }

}
    