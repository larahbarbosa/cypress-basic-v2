
describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(() => {
        cy.visit('./src/index.html')  
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Test long test delay Test long test delayTest long test delayTest long test delayTest long test delay'
        cy.get('#firstName').type('Larissa')
        cy.get('#lastName').type('Barbosa')
        cy.get('#email').type('larissa@teste.com')
        cy.get('#open-text-area').type(longText, { delay:0 })
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })
  })
