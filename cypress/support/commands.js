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

Cypress.Commands.add("addItemToCart", (item) => {
    cy.getTestSelector("event-card").each(($el) => {
        cy.wrap($el).find('h2').then($heading => {
            if ($heading.text() === item.name) {
                cy.getTestSelector("navbar-link-cart").then($cart => {
                let currentCartItemTotal = +$cart.text().slice(5,6);
                cy.wrap($el).find('button.button-primary').contains('Add to Cart').click();
                cy.getTestSelector("navbar-link-cart").should('include.text', `${currentCartItemTotal + 1}`);
                currentCartItemTotal = currentCartItemTotal + 1;
                });
            }
        });
    });
  });

Cypress.Commands.add("addItemToCartFromDetailedView", (item) => {
    cy.getTestSelector("event-detail").then($el => {
        cy.getTestSelector("navbar-link-cart").then($cart => {
        let currentCartItemTotal = +$cart.text().slice(5,6);
        cy.wrap($el).find('button.button-primary').contains('Add to Cart').click();
        cy.getTestSelector("navbar-link-cart").should('include.text', `${currentCartItemTotal + 1}`);
        currentCartItemTotal = currentCartItemTotal + 1;
        });
    });
  });
  
Cypress.Commands.add("verifyItemsInCart", (item, amount = '1') => {
    cy.getTestSelector("cart-item").contains(item.name)
    .should('have.length', 1)
    .parent().parent().as('item');

    cy.get("@item").then($el => {
        cy.wrap($el).find('h2').then($heading => {
            expect($heading.text()).to.be.equal(item.name);
        });
        cy.wrap($el).find('span[data-test="cart-item-when"]').then($when => {
            expect($when.text()).to.be.equal(item.when);
        });
        cy.wrap($el).find('span[data-test="event-artist"]').then($artist => {
            expect($artist.text()).to.be.equal(item.artist);
        });
        cy.wrap($el).find('[data-test="cart-item-price"]').then($price => {
            expect($price.text()).to.be.equal(`${item.price} €`);
        });
        cy.wrap($el).find('input').then($input => {
            expect($input.val()).to.be.equal(amount);
        });
        cy.wrap($el).find('button.button-danger').should('be.visible').and('not.be.disabled').and('have.text', "Remove"); 
    });
});

Cypress.Commands.add("changeItemQuantityInCart", { prevSubject: true}, (item, value) => {
    cy.wrap(item).find('input').type(`{selectall}${value}`);
});

Cypress.Commands.add("verifyCartSummary", (totalAmount, totalPrice) => {
    cy.getTestSelector('cart-total-items').should('have.text', `Total: ${totalAmount} items`);
    cy.getTestSelector('cart-total-price').should('have.text', `Price: ${totalPrice} €`);
});

    
