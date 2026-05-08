describe('OrangeHRM Login Intercept', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[name="username"]').should('be.visible')
  })
  
  it('TC001 - Login berhasil', () => {

    cy.intercept('POST', '**/auth/validate').as('loginRequest')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response.statusCode).to.eq(302)
    })

    cy.url().should('include', '/dashboard')
  })
  
  it('TC002 - Login gagal password salah', () => {

    cy.intercept('POST', '**/auth/validate').as('loginFailed')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('salahpassword')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginFailed')

    cy.contains('Invalid credentials').should('be.visible')
  })
  
  it('TC003 - Dashboard API berhasil load', () => {

    cy.intercept('GET', '**/api/v2/dashboard/employees/action-summary').as('dashboardAPI')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@dashboardAPI').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
    })
  })
  
  it('TC004 - Profile API berhasil dipanggil', () => {

    cy.intercept('GET', '**/api/v2/pim/employees/**').as('profileAPI')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait(3000)

    cy.get('span.oxd-main-menu-item--name')
      .contains('My Info')
      .click()

    cy.wait('@profileAPI')
  })
  
  it('TC005 - Logout berhasil', () => {

    cy.intercept('GET', '**/auth/logout').as('logoutAPI')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/dashboard')

    cy.get('.oxd-userdropdown-tab').click()
    cy.contains('Logout').click()

    cy.wait('@logoutAPI')

    cy.url().should('include', '/auth/login')
  })

})