import { LoginPage } from './loginPage'

export class DashboardPage {
  
  loginPage = new LoginPage()

  apiWait(prefix, expectedStatus = 200) {
    cy.wait(`@${prefix}`)
      .its('response.statusCode')
      .should('eq', expectedStatus)
  }

  apiGetProfile() {
    const prefix = 'profileAPI'
    cy.intercept('GET', '**/api/v2/pim/employees/**').as(prefix)
    return prefix
  }

  apiPutProfile() {
    const prefix = 'profileAPI'
    cy.intercept('PUT', '**/api/v2/pim/employee/**').as(prefix)
    return prefix
  }

  apiGetUser() {
    const prefix = 'userAPI'
    cy.intercept('GET', '**/api/v2/admin/users').as(prefix)
    return prefix
  }

  loginAsValidUser(username, password) {
    this.loginPage.visitPage()
    this.loginPage.login(username, password, true)
  }

  viewProfile() {
    const profileAlias = this.apiGetProfile()
    
    this.clickContain('My Info')
    this.apiWait(profileAlias)  
  }

  viewContactDetails(search = null) {
    this.clickContain('PIM')
    this.clickContain('Employee List')

    if (search) {
      cy.get('input[placeholder="Type for hints..."]')
        .first()
        .type(search)

      this.clickContain('Search')
    }
    
    cy.get('.oxd-table-row', { timeout: 10000 })
      .should('have.length.greaterThan', 0)

    this.clickRandomCard()

    cy.url().should('include', '/pim/viewPersonalDetails')

    this.clickContain('Contact Details')
    this.shouldContain('Contact Details', 'be.visible')
  }

  updateContactDetails(search = null) {
    this.viewContactDetails(search)

    this.inputFieldByLabel('Street 1', 'Jl. Sudirman')
    this.inputFieldByLabel('City', 'Jakarta')

    const profileAlias = this.apiPutProfile()

    this.clickContain('Save')

    this.apiWait(profileAlias, 200)

    this.shouldContain('Successfully Updated', 'be.visible')
  }

  clickContain(selector, text = null) {
     if (text) {
      cy.contains(selector, text).click()
    } else {
      cy.contains(selector).click()
    }
  }

  clickRandomCard() {
    cy.get('.oxd-table-body .oxd-table-row')
      .then(($els) => {
        const randomIndex = Math.floor(Math.random() * $els.length)

        cy.wrap($els[randomIndex])
          .click({ force: true })
      })
  }

  shouldContain(selector, args) {
    cy.contains(selector).should(args)
  }

  inputField(attr, value) {
    cy.get(attr)
      .should('be.visible')
      .clear()
      .type(value)
  }

  inputFieldByLabel(label, value) {
    cy.contains('label', label)
      .parent()
      .parent()
      .find('input')
      .clear()
      .type(value)
  }

  verifyResult(name) {
    cy.contains(name).should('exist')
  }

  verifyPage() {
    cy.url().should('include', '/directory')
  }

  verifyCardVisible() {
    cy.get('.orangehrm-directory-card')
      .should('have.length.greaterThan', 0)
  }

}
    