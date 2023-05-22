
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
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('Exibe uma mensagem de erro ao submeter o fomulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Larissa')
        cy.get('#lastName').type('Barbosa')
        cy.get('#email').type('testeerro.com')
        cy.get('#open-text-area').type('Teste erro text-area')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('Campo telefone continua vazio quando preenchido como não-numérico', function() {
        cy.get('#phone')
        .type('ashausha')
        .should('have.value', '')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Larissa')
        cy.get('#lastName').type('Barbosa')
        cy.get('#email').type('teste@teste.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste erro phone')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
            .type('Cesar')
            .should('have.value', 'Cesar')
            .clear()
            .should('have.value', '')
        
        cy.get('#lastName')
            .type('Moraes')
            .should('have.value', 'Moraes')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('teste@teste.com')
            .should('have.value', 'teste@teste.com')
            .clear()
            .should('have.value', '')
        
        cy.get('#phone')
            .type('12345')
            .should('have.value', '12345')
            .clear()
            .should('have.value', '')
    })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {

        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('Envia um formulário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
    })

    it('Seleciona um produto (Youtube) por seu texto', function() {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('Seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('Seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('Marca o tipo de atendmento "Feedback', function() {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('Marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('Marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked') 
    })
    it.only('Seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', 'example.json')
    })
  })
