export class LoginPage {

  visitPage() {
    cy.visit('https://opensource-demo.orangehrmlive.com')
  }

  inputUsername(username) {
    cy.get('input[name="username"]').type(username)
  }

  inputPassword(password) {
    cy.get('input[name="password"]').type(password)
  }

  clickLogin() {
    cy.get('button[type="submit"]').click()
  }

  login(username, password) {
    // this.visitPage()
    this.inputUsername(username)
    this.inputPassword(password)
    this.clickLogin()
  }

}

// export default new LoginPage
    