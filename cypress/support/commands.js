Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Larissa')
    cy.get('#lastName').type('Barbosa')
    cy.get('#email').type('larissa@teste.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
})