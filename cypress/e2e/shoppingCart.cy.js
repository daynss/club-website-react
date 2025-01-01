describe('Shopping Cart Test Suite', function() {
    beforeEach(function() {
        this.baseUrl = Cypress.config('baseUrl');

        cy.fixture("events").then((data) => {
            this.events = data;
        })
    });

    it('Verify that selected item on the Program page is added to the Cart', function() {
        cy.visit('/program');

        this.events['events_1'].forEach(event => {
            cy.addItemToCart(event);
        });

        cy.getTestSelector("navbar-link-cart").click();
        cy.url().should('eq', `${this.baseUrl}/cart`);
        cy.getTestSelector("navbar-link-cart").should('include.text', '3');
        
        this.events['events_1'].forEach((event) => {
            cy.verifyItemsInCart(event);
        });

        cy.getTestSelector("cart-item").should('have.length', 3);
        cy.getTestSelector('cart-total-items').should('have.text', 'Total: 3 items');
        cy.getTestSelector('cart-total-price').should('have.text', 'Price: 40 €');
    });

    it('Verify that selected item on the Event detail page is added to the cart', function() {
        cy.visit('/program');

        this.events['events_2'].forEach(event => {
            cy.getTestSelector("event-card").find('h2').contains(event.name).then($el => {
                cy.wrap($el).parent().find('a.link-button').contains('Read more').click();
                cy.addItemToCartFromDetailedView();
                cy.getTestSelector("navbar-link-program").click();
            });
        });

        cy.getTestSelector("navbar-link-cart").click();
        cy.url().should('eq', `${this.baseUrl}/cart`);
        cy.getTestSelector("navbar-link-cart").should('include.text', '3');

        this.events['events_2'].forEach((event) => {
            cy.verifyItemsInCart(event);
        });
        cy.getTestSelector("cart-item").should('have.length', 3);
        cy.getTestSelector('cart-total-items').should('have.text', 'Total: 3 items');
        cy.getTestSelector('cart-total-price').should('have.text', 'Price: 34 €');
    }); 
    
    it('Verify that the total price and total amount in the Cart summary is updated correctly after adding an item', function() {
        cy.visit('/program');
        cy.addItemToCart(this.events['events_1'][0]);
        cy.getTestSelector("navbar-link-cart").click();
        cy.url().should('eq', `${this.baseUrl}/cart`);
        cy.getTestSelector("navbar-link-cart").should('include.text', '1');
        cy.verifyItemsInCart(this.events['events_1'][0]);

        cy.getTestSelector('cart-total-items').should('have.text', 'Total: 1 items');
        cy.getTestSelector('cart-total-price').should('have.text', 'Price: 16 €');

        cy.getTestSelector("cart-back-to-program-button").find('a').contains('Back to program outline').click();
        cy.addItemToCart(this.events['events_2'][0]);
        cy.getTestSelector("navbar-link-cart").click();
        cy.url().should('eq', `${this.baseUrl}/cart`);
        cy.getTestSelector("navbar-link-cart").should('include.text', '2');
        cy.verifyItemsInCart(this.events['events_2'][0]);

        cy.getTestSelector('cart-total-items').should('have.text', 'Total: 2 items');
        cy.getTestSelector('cart-total-price').should('have.text', 'Price: 24 €');

        cy.getTestSelector("cart-back-to-program-button").find('a').contains('Back to program outline').click();
        cy.addItemToCart(this.events['events_2'][2]);
        cy.getTestSelector("navbar-link-cart").click();
        cy.url().should('eq', `${this.baseUrl}/cart`);
        cy.getTestSelector("navbar-link-cart").should('include.text', '3');
        cy.verifyItemsInCart(this.events['events_2'][2]);

        cy.getTestSelector('cart-total-items').should('have.text', 'Total: 3 items');
        cy.getTestSelector('cart-total-price').should('have.text', 'Price: 36 €');

        cy.getTestSelector("cart-back-to-program-button").find('a').contains('Back to program outline').click();
        cy.addItemToCart(this.events['events_1'][0]);
        cy.getTestSelector("navbar-link-cart").click();
        cy.url().should('eq', `${this.baseUrl}/cart`);
        cy.getTestSelector("navbar-link-cart").should('include.text', '4');
        cy.verifyItemsInCart(this.events['events_1'][0],'2');

        cy.getTestSelector('cart-total-items').should('have.text', 'Total: 4 items');
        cy.getTestSelector('cart-total-price').should('have.text', 'Price: 52 €');

        cy.getTestSelector("cart-back-to-program-button").find('a').contains('Back to program outline').click();
        cy.addItemToCart(this.events['events_2'][2]);
        cy.getTestSelector("navbar-link-cart").click();
        cy.url().should('eq', `${this.baseUrl}/cart`);
        cy.getTestSelector("navbar-link-cart").should('include.text', '5');
        cy.verifyItemsInCart(this.events['events_2'][2], '2');

        cy.getTestSelector('cart-total-items').should('have.text', 'Total: 5 items');
        cy.getTestSelector('cart-total-price').should('have.text', 'Price: 64 €');
    });

    it('Verify that the total price and total amount in the Cart summary is updated correctly after changes done in the cart', function() {
        cy.visit('/program');

        this.events['events_2'].forEach(event => {
            cy.addItemToCart(event);
        });

        cy.getTestSelector("navbar-link-cart").click();
        cy.url().should('eq', `${this.baseUrl}/cart`);
        cy.getTestSelector("navbar-link-cart").should('include.text', '3');
        cy.getTestSelector("cart-item").should('have.length', 3);
        cy.verifyCartSummary(3, 34);

        cy.getTestSelector("cart-item").eq(0).changeItemQuantityInCart(3);
        cy.getTestSelector("cart-item").should('have.length', 3);
        cy.getTestSelector("navbar-link-cart").should('include.text', '5');
        cy.verifyCartSummary(5, 50);

        cy.getTestSelector("cart-item").eq(1).changeItemQuantityInCart(6);
        cy.getTestSelector("cart-item").should('have.length', 3);
        cy.getTestSelector("navbar-link-cart").should('include.text', '10');
        cy.verifyCartSummary(10, 120);
    });


    it('Verify that quantity input field does not accept values below 1 and values above 100', function() {
        cy.visit('/program');

        this.events['events_2'].forEach(event => {
            cy.addItemToCart(event);
        });
        cy.getTestSelector("navbar-link-cart").click();
        cy.url().should('eq', `${this.baseUrl}/cart`);
        cy.getTestSelector("navbar-link-cart").should('include.text', '3');

        cy.getTestSelector("cart-item").eq(0).changeItemQuantityInCart(0);
        cy.getTestSelector("navbar-link-cart").should('include.text', '3');
        cy.verifyCartSummary(3, 34);

        cy.getTestSelector("cart-item").eq(1).changeItemQuantityInCart(-1);
        cy.getTestSelector("navbar-link-cart").should('include.text', '3');
        cy.verifyCartSummary(3, 34);

        cy.getTestSelector("cart-item").eq(2).changeItemQuantityInCart(101);
        cy.getTestSelector("navbar-link-cart").should('include.text', '12');
        cy.verifyCartSummary(12, 142);

        cy.getTestSelector("cart-item").eq(2).changeItemQuantityInCart(542);
        cy.getTestSelector("navbar-link-cart").should('include.text', '56');
        cy.verifyCartSummary(56, 670);

        cy.getTestSelector("cart-item").eq(2).changeItemQuantityInCart(-1);
        cy.getTestSelector("navbar-link-cart").should('include.text', '56');
        cy.verifyCartSummary(56, 670);

        cy.getTestSelector("cart-item").eq(2).changeItemQuantityInCart(-10);
        cy.getTestSelector("navbar-link-cart").should('include.text', '56');
        cy.verifyCartSummary(56, 670);
    });
});