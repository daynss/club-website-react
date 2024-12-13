// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getTestSelector', (selector) => {
    cy.get(`[data-test="${selector}"]`);
});

Cypress.Commands.add('verifyFormInput', {prevSubject: true}, ($el, $text, $type, $name, error) => {
    expect($el).to.be.visible;
    cy.wrap($el).find('label').should('be.visible').and('have.text', $text);
    cy.wrap($el).find('input').should('be.visible').and('have.attr', 'type', $type).and('have.attr', 'name', $name).and('not.be.disabled');
  
    if (error) {
        cy.wrap($el).find('span').should('be.visible').and('have.css', 'color', 'rgb(255, 95, 89)')
        cy.wrap($el).find('input').should('be.visible').and('have.css', 'border', '1px solid rgb(255, 95, 89)')
        error === 'required' &&
            cy.wrap($el).find('span').should('be.visible').and('have.text', 'Required')
        error === 'invalid email' &&
            cy.wrap($el).find('span').should('be.visible').and('have.text', 'Incorrect email format')
        error === 'minLength'  &&     
            cy.wrap($el).find('span').should('be.visible').and('have.text', 'Must be more than 2 characters')
    } else {
        cy.wrap($el).find('input').should('be.visible').and('have.css', 'border', '0px none rgb(70, 65, 65)')
        cy.wrap($el).find('span').should('be.empty');
    }
});

Cypress.Commands.add('verifyFormTextArea', {prevSubject: true}, ($el, $text, $name, error) => {
    expect($el).to.be.visible;
    cy.wrap($el).find('label').should('be.visible').and('have.text', $text);
    cy.wrap($el).find('textarea').should('be.visible').and('have.attr', 'name', $name).and('not.be.disabled');

    if (error) {
        cy.wrap($el).find('span').should('be.visible').and('have.css', 'color', 'rgb(255, 95, 89)')
        cy.wrap($el).find('textarea').should('be.visible').and('have.css', 'border', '1px solid rgb(255, 95, 89)')
        error === 'required' &&
            cy.wrap($el).find('span').should('be.visible').and('have.text', 'Required')
        error === 'minLength'  &&     
            cy.wrap($el).find('span').should('be.visible').and('have.text', 'Must be more than 2 characters')
    } else {
        cy.wrap($el).find('textarea').should('be.visible').and('have.css', 'border', '0px none rgb(70, 65, 65)')
        cy.wrap($el).find('span').should('be.empty');
    }
});
