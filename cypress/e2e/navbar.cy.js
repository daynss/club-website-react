describe('Navigation Bar Test Suite', function() {
  beforeEach(function() {
    cy.visit('/');

    this.baseUrl = Cypress.config('baseUrl');

    cy.fixture("navbar").then((data) => {
      this.navItems = data.navigationItems;
    });
  });


  // Functional test cases - desktop
  it('Verify that user is able to see and click on each item on the navbar', function () {
    cy.getTestSelector("navbar").should('be.visible');
    this.navItems.map(item => {
      cy.getTestSelector(item.id)
      .should('be.visible')
      .and('contain.text', item.text)
      .and('not.be.disabled')
      .and('have.attr', 'href', item.url);
    });
  });

  it('Verify that if user clicks on any item from the navbar, then user should be redirected to the destination page', function () {
    this.navItems.map(item => {
      cy.getTestSelector(item.id).click();
      cy.url().should('eq', `${this.baseUrl}${item.url}`);
    });
  });

  it('Verify that if user clicks on the navbar item of a current page, then user should not be redirected to a different page', function () {
    this.navItems.map(item => {
      cy.getTestSelector(item.id).click();
      cy.url().should('eq', `${this.baseUrl}${item.url}`);
      cy.getTestSelector(item.id).click();
      cy.url().should('eq', `${this.baseUrl}${item.url}`);
    });
  });

  it('Verify that clicking on a random navbar item takes the user to correct page', function () {
    cy.get('.navbar-links > ul > li > a').as('navItems');

    cy.get('@navItems').eq(3).click();
    cy.url().should('eq', `${this.baseUrl}/cart`);
    cy.get('.cart-program-link-section').should('be.visible').and('have.text', 'Back to program outline');
    
    cy.get('@navItems').eq(1).click();
    cy.url().should('eq', `${this.baseUrl}/program`);
    cy.get('.program-outline > h2').should('be.visible').and('have.text', 'August 2025');

    cy.get('@navItems').eq(0).click();
    cy.url().should('eq', `${this.baseUrl}/`);

    cy.get('@navItems').eq(2).click();
    cy.url().should('eq', `${this.baseUrl}/contact`);
 
    cy.getTestSelector("navbar-logo").click();
    cy.url().should('eq', `${this.baseUrl}/`);
  });

  it('Verify that adding an item to cart reflects in the navbar Cart item', function () {
    cy.getTestSelector("navbar-link-program").click();
    cy.get('.event-card .event-content-button-wrapper > button').eq(1).click();
    cy.getTestSelector("navbar-link-cart").should('contain.text', '(1)');
    cy.get('.event-card .event-content-button-wrapper > button').eq(0).click();
    cy.getTestSelector("navbar-link-cart").should('contain.text', '(2)');
  });
  

  // Functional test cases - mobile 
  it('Verify that clicking the hamburger menu in the navigation shows or hides navigation links dropdown', function() {
    cy.viewport(390, 844);
    cy.getTestSelector("navbar").should('be.visible');
    cy.getTestSelector('navbar-logo').should('be.visible').and('contain.text', 'Imaginarium Club').and('not.be.disabled');
    cy.getTestSelector("navbar-link-cart-mobile").should('be.visible').and('contain.text', '(0)').and('not.be.disabled');
    cy.get('div.navbar-links').should('not.be.visible');
    cy.getTestSelector('navbar-menu-icon').should('be.visible').click();
    cy.get('div.navbar-links').should('be.visible');
    cy.getTestSelector('navbar-menu-icon').should('be.visible').click();
    cy.get('div.navbar-links').should('not.be.visible');
  });
   
  it('Verify that if user clicks on any item from the navigation links dropdown, then user should be redirected to the destination page and navigation dropdown hides', function () {
    cy.viewport(390, 844);
    cy.getTestSelector("navbar").should('be.visible');
    cy.get('div.navbar-links').should('not.be.visible');
    cy.getTestSelector('navbar-menu-icon').should('be.visible').click();
    cy.get('div.navbar-links').should('be.visible');
    this.navItems.map(item => {
      cy.getTestSelector(item.mobileId || item.id)
      .should('be.visible')
      .and('have.text', item.mobileText || item.text )
      .and('not.be.disabled')
      .and('have.attr', 'href', item.url);
      cy.getTestSelector(item.mobileId || item.id).click();
      cy.url().should('eq', `${this.baseUrl}${item.url}`);
      cy.get('div.navbar-links').should('not.be.visible');
      cy.getTestSelector('navbar-menu-icon').should('be.visible').click();
    });
  });
  
  it('Verify that adding an item to cart on mobile reflects in the navbar Cart item', function () {
    cy.viewport(390, 844);
    cy.getTestSelector('navbar-menu-icon').should('be.visible').click();
    cy.get('div.navbar-links').should('be.visible');
    cy.getTestSelector("navbar-link-program").click();
    cy.get('.event-card .event-content-button-wrapper > button').eq(1).click();
    cy.getTestSelector("navbar-link-cart-mobile").should('contain.text', '(1)');
    cy.get('.event-card .event-content-button-wrapper > button').eq(0).click();
    cy.getTestSelector("navbar-link-cart-mobile").should('contain.text', '(2)');
  });


  // UI test cases - desktop
  it('Verify that design of the navigation bar on desktop is as per requirements', function () {
    cy.getTestSelector("navbar").as('navbar')
    .should('be.visible')
    .should('have.css','background-color', 'rgb(255, 255, 255)')
    .and('have.css', 'position', 'fixed')
    .and('have.css','top', '0px')
    .and('have.css','left', '0px');

    this.navItems.map(item => {
      cy.getTestSelector(item.id).then($el => {
        expect($el).to.be.visible;
        expect($el).to.have.css('color', `${item.id === 'navbar-link-cart' ? 'rgb(255, 95, 89)' : 'rgb(70, 65, 65)'}`)
        expect($el).to.have.css('font-size', `${item.id === 'navbar-logo' ? '22.4px' : '16px'}`)
      })
    });

    cy.getTestSelector("navbar-link-cart").should('be.visible').and('have.text', 'Cart(0)').and('not.have.text', '(0)');;
    cy.getTestSelector("navbar-link-cart-mobile").should('not.be.visible');   
  });


  // UI test cases - mobile
  it('Verify that design of the navigation bar on mobile is as per requirements', function () {
    // mobile - hamburger menu UI
    cy.viewport(390, 844);
    cy.getTestSelector("navbar").should('be.visible')
    .should('have.css','background-color', 'rgb(255, 255, 255)')
    .and('have.css', 'position', 'fixed')
    .and('have.css','top', '0px')
    .and('have.css','left', '0px');
    cy.get('div.navbar-links').should('not.be.visible');
    // logo
    cy.getTestSelector('navbar-logo').should('be.visible')
    .and('not.be.disabled')
    .and('have.css', 'font-size', '19.2px');
    // cart icon
    cy.getTestSelector("navbar-link-cart").should('not.be.visible')
    cy.getTestSelector("navbar-link-cart-mobile").should('be.visible').and('not.have.text','Cart(0)').and('have.text', '(0)');
    // hamburger menu
    cy.getTestSelector('navbar-menu-icon').should('be.visible')
    .and('have.css', 'width', '32px')
    .and('have.css', 'margin-left', '16px')
    .find('span').each($el => {
      expect($el).to.be.visible;
      expect($el).to.have.css('height').match(/3.2/);
      expect($el).to.have.css('background-color', 'rgb(70, 65, 65)');
      expect($el).to.have.css('margin', '4.8px 0px');
    });
    
    // hamburger menu - active:
    cy.getTestSelector('navbar-menu-icon').click();
    cy.getTestSelector('navbar-menu-icon').find('span').eq(0).should('be.hidden').and('not.be.visible')
    cy.getTestSelector('navbar-menu-icon').find('span').eq(2).should('be.hidden').and('not.be.visible')
    cy.getTestSelector('navbar-menu-icon').find('span').eq(1).should('not.be.hidden').and('be.visible');
    
    // navbar links dropdown - expanded:
    cy.get('div.navbar-links').should('be.visible');
    cy.getTestSelector("navbar-link-cart").should('not.be.visible');
    this.navItems.map(item => {
      cy.getTestSelector(item.mobileId || item.id).then($el => {
        expect($el).to.be.visible;
        expect($el).to.have.css('color', `${item.id === 'navbar-link-cart' ? 'rgb(255, 95, 89)' : 'rgb(70, 65, 65)'}`)
        expect($el).to.have.css('font-size', `${item.id === 'navbar-logo' ? '19.2px' : '16px'}`)
      });
    });

    // hamburger menu - not active:
    cy.getTestSelector('navbar-menu-icon').click();
    
    // repeat test to verify hamburger menu again after collapsing
    cy.getTestSelector('navbar-menu-icon').should('be.visible')
    .and('have.css', 'width', '32px')
    .and('have.css', 'margin-left', '16px')
    .find('span').each($el => {
      expect($el).to.be.visible;
      expect($el).to.have.css('height').match(/3.2/);
      expect($el).to.have.css('background-color', 'rgb(70, 65, 65)');
      expect($el).to.have.css('margin', '4.8px 0px');
    });
    
    // navbar links dropdown - collapsed:
    cy.get('div.navbar-links').should('not.be.visible');
    cy.getTestSelector('navbar-logo').should('be.visible');
    cy.getTestSelector("navbar-link-cart").should('not.be.visible')
    cy.getTestSelector("navbar-link-cart-mobile").should('be.visible').and('not.have.text','Cart(0)').and('have.text', '(0)');
    cy.getTestSelector("navbar-link-about").should('not.be.visible');
    cy.getTestSelector("navbar-link-program").should('not.be.visible');
    cy.getTestSelector("navbar-link-contact").should('not.be.visible');
    cy.getTestSelector("navbar-link-cart").should('not.be.visible');
  });

  it('Verify that when user hovers over the nav item label text, opacity of the label text changes', function () {
    this.navItems.map(item => {
      cy.getTestSelector(item.id).then($el => {
        expect($el).to.be.visible;
        // cursor
        expect($el).to.have.css('cursor', 'pointer');
        // hover opacity change
        cy.wrap($el).realHover().then(($el) => {
          expect($el).to.have.css("opacity", "0.5");
        });
      })
    });
  });
});