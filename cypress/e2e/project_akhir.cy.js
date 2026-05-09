import { LoginPage } from "../support/PageObject/loginPage"
import { ForgotPasswordPage } from "../support/PageObject/ForgotPassworPage"
import { DashboardPage } from "../support/PageObject/DashboardPage.js"
import loginData from "../fixtures/loginData.json"

describe('OrangeHRM - Open Source HR Management', () => {

  const loginPage = new LoginPage()
  const dashboardPage = new DashboardPage()
  const forgotPasswordPage = new ForgotPasswordPage()

  // it('Login dengan credential yang valid', () => {
  //   loginPage.visitPage()
  //   loginPage.login(
  //     loginData.validCredentials.username,
  //     loginData.validCredentials.password,
  //     true
  //   )
  // })

  // it('Login dengan password yang tidak valid', () => {
  //   loginPage.visitPage()
  //   loginPage.login(
  //     loginData.invalidPassword.username,
  //     loginData.invalidPassword.password,
  //     false
  //   )
  // });

  // it('Login dengan username yang not valid', () => {
  //   loginPage.visitPage()
  //   loginPage.login(
  //     loginData.invalidUsername.username,
  //     loginData.invalidUsername.password,
  //     false
  //   )
  // });

  // it('Login dengan field dan password kosong', () => {
  //   loginPage.visitPage()
  //   loginPage.login(
  //     loginData.emptyFields.username,
  //     loginData.emptyFields.password,
  //     false
  //   )
  // });

  // it('Login dengan email', () => {
  //   loginPage.visitPage()
  //   loginPage.login(
  //     loginData.validEmail.username,
  //     loginData.validEmail.password,
  //     false
  //   )
  // });

  // it('Salah password berulang', () => {
  //   loginPage.visitPage()
  //   loginPage.login(
  //     loginData.emptyFields.username,
  //     loginData.emptyFields.password,
  //     false
  //   )
  // });

  it('Show dashboard if valid username and password are provided', () => {
    dashboardPage.loginAsValidUser(
      loginData.validCredentials.username,
      loginData.validCredentials.password
    )
  });

  it('Forgot password dengan username valid dan action cancel', () => {
    forgotPasswordPage.visitPage()
    forgotPasswordPage.triggerCancel(loginData.validCredentials.username)
    forgotPasswordPage.verifyBackToLogin()
  });  

  it('Forgot password dengan username valid dan action reset', () => {
    forgotPasswordPage.visitPage()
    forgotPasswordPage.triggerReset(loginData.validCredentials.username)
    forgotPasswordPage.verifyResetSuccess()
  });  

  it('Forgot password dengan username invalid dan action cancel', () => {
    forgotPasswordPage.visitPage()
    forgotPasswordPage.triggerCancel(loginData.invalidUsername.username)
    forgotPasswordPage.verifyBackToLogin()
  });

  it('Forgot password dengan username blank dan action reset', () => {
    forgotPasswordPage.visitPage()
    forgotPasswordPage.triggerReset(loginData.emptyFields.username)
    forgotPasswordPage.verifyRequiredValidation()
  });  

});

