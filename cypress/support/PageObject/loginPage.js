export class LoginPage {

  visitPage() {
    cy.visit('https://opensource-demo.orangehrmlive.com')
  }

  authValidate() {
    const prefix = 'authValidate'
    cy.intercept('POST', '**/auth/validate')
      .as(prefix)
    return prefix
  }

  apiDashboard(path = 'employees/action-summary') {
    const prefix = 'dashboardAPI'
    const urlPattern = `**/api/v2/dashboard/${path}`
    cy.intercept('GET', urlPattern)
      .as(prefix)
    return prefix
  }

  inputUsername(username) {
    cy.get('input[name="username"]')
      .should('be.visible')
      .type(username)
  }

  inputPassword(password) {
    cy.get('input[name="password"]')
      .should('be.visible')
      .type(password)
  }

  clickLogin() {
    cy.get('button[type="submit"]')
      .click()
  }

  login(username, password, isValid = true) {
    let authValidatePrefix = this.authValidate()
    let dashboardAPIPrefix
    if (isValid) {
      dashboardAPIPrefix = this.apiDashboard()
    }

    this.inputUsername(username)
    this.inputPassword(password)
    this.clickLogin()
    
    cy.wait(`@${authValidatePrefix}`)
      .its('response.statusCode')
      .should('eq', 302)

    if (dashboardAPIPrefix) {
      cy.wait(`@${dashboardAPIPrefix}`)
        .its('response.statusCode')
        .should('eq', 200)

      cy.url({ timeout: 3000 })
        .should('include', '/dashboard')

      cy.contains('Dashboard')
        .should('be.visible')
    } else {
      cy.contains('Invalid credentials', { timeout: 10000 })
        .should('be.visible')

      cy.url({ timeout: 3000 })
        .should('include', '/auth/login')
    }
  }

}
    