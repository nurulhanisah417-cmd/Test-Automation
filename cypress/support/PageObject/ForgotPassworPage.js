import { LoginPage } from "./loginPage";

const loginPage = new LoginPage()

export class ForgotPasswordPage {

  visitPage() {
    loginPage.visitPage()
    cy.get('div[class="orangehrm-login-forgot"]').click()
  }

  inputUsername(username) {
    cy.get('input[name="username"]')
      .clear()
      .type(username)
  }

  clickCancel() {
    cy.get('button[type="button"]').click()
  }

  clickReset() {
    cy.get('button[type="submit"]').click()
  }

  triggerCancel(username) {
    this.inputUsername(username)
    this.clickCancel()
  }

  triggerReset(username) {
    this.inputUsername(username)
    this.clickReset()
  }

  verifyResetSuccess() {
    cy.contains('Reset Password link sent successfully')
      .should('be.visible')

    cy.url({ timeout: 3000 })
      .should('include', '/auth/sendPasswordReset')
  }

  verifyBackToLogin() {
    cy.url({ timeout: 3000 })
      .should('include', '/auth/login')
  }

  verifyRequiredValidation() {
    cy.contains('Required').should('be.visible')
  }

}
    