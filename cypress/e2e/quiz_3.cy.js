describe('OrangeHRM - Open Source HR Management', () => {

  it('Login dengan credential yang valid', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
  });

  it('Login dengan password yang tidak valid', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('orange123');
    cy.get('button[type="submit"]').click();
  });

  it('Login dengan username yang not valid', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com');
    cy.get('input[name="username"]').type('Orange');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
  });
  
  it('Login dengan field dan password kosong', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com');
    cy.get('input[name="username"]').type('-');
    cy.get('input[name="password"]').type('-');
    cy.get('button[type="submit"]').click();
  });

it('Login dengan email', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com');
    cy.get('input[name="username"]').type('admin@gmail.com');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
  });  


  it('Salah password berulang', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('salah123');
    cy.get('button[type="submit"]').click();
  });  

   it('Reset password dengan username valid', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com');
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('-');
    cy.get('button[type="submit"]').click();
  });  
});
