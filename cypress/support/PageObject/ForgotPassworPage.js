import { LoginPage } from "./loginPage";

const loginPage = new LoginPage()

export class ForgotPasswordPage {

  orangehrmUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php'

  visitPage() {
    cy.visit(`${this.orangehrmUrl}/auth/requestPasswordResetCode`)

    cy.url()
      .should('include', '/auth/requestPasswordResetCode')

    cy.contains('Reset Password')
      .should('be.visible')
  }

  apiWait(prefix, expectedStatus = 200) {
    cy.wait(`@${prefix}`)
      .its('response.statusCode')
      .should('eq', expectedStatus)
  }

  apiResetPassword() {
    const alias = 'resetPasswordAPI'
    cy.intercept('POST', '**/auth/requestPasswordResetCode').as(alias)
    return alias
  }

  inputUsername(username) {
    cy.get('input[name="username"]')
      .should('be.visible')
      .clear()
      .type(username)
  }

  clickCancel() {
    cy.contains('button', 'Cancel')
      .should('be.visible')
      .click({ force: true })
  }

  clickReset() {
    cy.contains('button', 'Reset Password')
      .should('be.visible')
      .click({ force: true })
  }

  triggerCancel(username) {
    this.inputUsername(username)
    this.clickCancel()
  }

  triggerReset(username) {
    const resetAlias = this.apiResetPassword()
    this.inputUsername(username)
    this.clickReset()
    this.apiWait(resetAlias, 302)
  }

  verifyResetSuccess() {
    cy.url({ timeout: 500 })
      .should('include', '/auth/sendPasswordReset')

    cy.contains('Reset Password link sent successfully')
      .should('be.visible')
  }

  verifyBackToLogin() {
    cy.url({ timeout: 500 })
      .should('include', '/auth/login')
  }

  verifyRequiredValidation() {
    cy.contains('Required')
      .should('be.visible')
  }

}
    