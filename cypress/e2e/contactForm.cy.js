describe('Contact Form Test Suite', function() {
    beforeEach(function() {
        cy.visit('/contact');

        this.baseUrl = Cypress.config('baseUrl');
    });

    it('Verify that contact form contains Email address field, Subject field, and Message field with relevant labels and a Send button', function() {
        cy.getTestSelector("contact-form").should('be.visible');
        cy.getTestSelector("contact-form-email").verifyFormInput('Email', 'email', 'email');
        cy.getTestSelector("contact-form-subject").verifyFormInput('Subject', 'text', 'subject');
        cy.getTestSelector("contact-form-textarea").verifyFormTextArea('Your message', 'message');

       cy.get('.contact-form button')
         .should('be.visible').and('have.length', 1)
         .and('not.be.disabled').and('have.attr', 'type', 'submit')
         .find('span').should('have.text', 'Send');
    });

    it('Verify that clicking on Send button after entering valid email address and filling out required fields, submits form data and displays success message', function() {
        cy.getTestSelector("contact-form-email").find('input').type('john.doe@email.com');
        cy.getTestSelector("contact-form-subject").find('input').type('Reservation for 14th September');
        cy.getTestSelector("contact-form-textarea").find('textarea').type('Lorem ipsum ... ');
        cy.get('.contact-form button').click();

        cy.wait(4000);
        cy.url().should('eq', `${this.baseUrl}/contact`);
        cy.getTestSelector("contact-form").should('not.to.exist');
        cy.getTestSelector("contact-form-email").should('not.to.exist');
        cy.getTestSelector("contact-form-subject").should('not.to.exist');
        cy.getTestSelector("contact-form-textarea").should('not.to.exist');
        cy.get('.contact-form button').should('not.to.exist');

        cy.getTestSelector("contact-form-success").should('be.visible').find('p').should($paragraphs => {
            expect($paragraphs).to.have.length(2);
            expect($paragraphs.first()).to.have.text('Thank you for your message!');
            expect($paragraphs.last()).to.have.text('We will get in touch soon.');
        });
    });

    it('Verify that fields error messages are displayed when clicking on submit button without filling all the mandatory fields', function() {
        cy.get('.contact-form button').click();
        cy.getTestSelector("contact-form-email").verifyFormInput('Email', 'email', 'email', 'required');
        cy.getTestSelector("contact-form-subject").verifyFormInput('Subject', 'text', 'subject', 'required');
        cy.getTestSelector("contact-form-textarea").verifyFormTextArea('Your message', 'message', 'required');

        cy.get('.contact-form button')
             .should('be.visible').and('have.length', 1)
             .and('not.be.disabled').and('have.attr', 'type', 'submit')
             .find('span').should('have.text', 'Send');

        cy.get('.form-field-error').should('be.visible').and('have.length', 3);
        cy.getTestSelector("contact-form-success").should('not.exist');
    });

    it('Verify that contact form cannot be submitted with empty Email address field, empty Subject field, and empty Message field', function() {
        cy.getTestSelector("contact-form-email").find('input').focus();
        cy.getTestSelector("contact-form-email").verifyFormInput('Email', 'email', 'email');
        cy.get("body").click(50, 250);
        cy.getTestSelector("contact-form-email").verifyFormInput('Email', 'email', 'email', 'required');

        cy.getTestSelector("contact-form-subject").find('input').focus();
        cy.getTestSelector("contact-form-subject").verifyFormInput('Subject', 'text', 'subject');
        cy.get("body").click(50, 250);
        cy.getTestSelector("contact-form-subject").verifyFormInput('Subject', 'text', 'subject', 'required');

        cy.getTestSelector("contact-form-textarea").find('textarea').focus();
        cy.getTestSelector("contact-form-textarea").verifyFormTextArea('Your message', 'message');
        cy.get("body").click(50, 250);
        cy.getTestSelector("contact-form-textarea").verifyFormTextArea('Your message', 'message', 'required');

        cy.get('.contact-form button').click();
        cy.get('.contact-form button')
        .should('be.visible').and('have.length', 1)
        .and('not.be.disabled').and('have.attr', 'type', 'submit')
        .find('span').should('have.text', 'Send');

        cy.get('.form-field-error').should('be.visible').and('have.length', 3);
        cy.getTestSelector("contact-form-success").should('not.exist');
    });

    it('Verify that Required error message appears when user leaves required fields empty and disappears after user fills in required fields', function() {
        cy.getTestSelector("contact-form-email").find('input').focus();
        cy.getTestSelector("contact-form-email").verifyFormInput('Email', 'email', 'email');
        cy.get("body").click(50, 250);
        cy.getTestSelector("contact-form-email").verifyFormInput('Email', 'email', 'email', 'required');

        cy.getTestSelector("contact-form-subject").find('input').focus();
        cy.getTestSelector("contact-form-subject").verifyFormInput('Subject', 'text', 'subject');
        cy.get("body").click(50, 250);
        cy.getTestSelector("contact-form-subject").verifyFormInput('Subject', 'text', 'subject', 'required');

        cy.getTestSelector("contact-form-textarea").find('textarea').focus();
        cy.getTestSelector("contact-form-textarea").verifyFormTextArea('Your message', 'message');
        cy.get("body").click(50, 250);
        cy.getTestSelector("contact-form-textarea").verifyFormTextArea('Your message', 'message', 'required');

        cy.get('.contact-form button').click();
        cy.get('.contact-form button')
        .should('be.visible').and('have.length', 1)
        .and('not.be.disabled').and('have.attr', 'type', 'submit')
        .find('span').should('have.text', 'Send');

        cy.get('.form-field-error').should('be.visible').and('have.length', 3);
        cy.getTestSelector("contact-form-success").should('not.exist');

        cy.getTestSelector("contact-form-email").find('input').type('john.doe@gmail.com');
        cy.getTestSelector("contact-form-email").verifyFormInput('Email', 'email', 'email');
        cy.getTestSelector("contact-form-subject").find('input').type('Reservation request');
        cy.getTestSelector("contact-form-subject").verifyFormInput('Subject', 'text', 'subject');
        cy.getTestSelector("contact-form-textarea").find('textarea').type('Lorem ipsum...');
        cy.getTestSelector("contact-form-textarea").verifyFormTextArea('Your message', 'message');

        cy.get('.form-field-error').should('not.be.visible');

        cy.get('.contact-form button').click();
        cy.wait(4000);
        cy.url().should('eq', `${this.baseUrl}/contact`);
        cy.getTestSelector("contact-form").should('not.exist');
        cy.get('.contact-form button').should('not.exist');
        cy.getTestSelector("contact-form-success").should('be.visible').find('p').should($paragraphs => {
            expect($paragraphs).to.have.length(2);
            expect($paragraphs.first()).to.have.text('Thank you for your message!');
            expect($paragraphs.last()).to.have.text('We will get in touch soon.');
        });
    });


    it('Verify contact form with invalid Email address value, invalid Subject field value, and invalid Message field value', function() {
        cy.getTestSelector("contact-form-email").find('input').type('john.doegmail.com');
        cy.getTestSelector("contact-form-subject").find('input').focus();
        cy.getTestSelector("contact-form-email").verifyFormInput('Email', 'email', 'email', 'invalid email');

        cy.getTestSelector("contact-form-subject").find('input').type('a');
        cy.getTestSelector("contact-form-textarea").find('textarea').focus();
        cy.getTestSelector("contact-form-subject").verifyFormInput('Subject', 'text', 'subject', 'minLength');

        cy.getTestSelector("contact-form-textarea").find('textarea').type('a');
        cy.get('.contact-form button').click();
        cy.wait(4000);
        cy.getTestSelector("contact-form-success").should('not.exist');
        cy.getTestSelector("contact-form-textarea").verifyFormTextArea('Your message', 'message', 'minLength');
        cy.get('.form-field-error').should('be.visible').and('have.length', 3);
        
        cy.reload();
        cy.getTestSelector("contact-form-email").find('input').type('&*w434^^^$##$');
        cy.get("body").click(50, 250);
        cy.getTestSelector("contact-form-email").verifyFormInput('Email', 'email', 'email', 'invalid email');

        cy.getTestSelector("contact-form-subject").find('input').type('ab');
        cy.get("body").click(50, 250);
        cy.getTestSelector("contact-form-subject").verifyFormInput('Subject', 'text', 'subject', 'minLength');

        cy.getTestSelector("contact-form-email").find('input').clear().type('john.doe@gmail.com');
        cy.get('.contact-form button').click();
        cy.wait(4000);
        cy.getTestSelector("contact-form-success").should('not.exist');
        cy.getTestSelector("contact-form-email").verifyFormInput('Email', 'email', 'email');
        cy.getTestSelector("contact-form-subject").verifyFormInput('Subject', 'text', 'subject', 'minLength');
        cy.getTestSelector("contact-form-textarea").verifyFormTextArea('Your message', 'message', 'required');
        cy.get('.form-field-error').eq(0).should('not.be.visible');
        cy.get('.form-field-error').eq(1).should('be.visible');
        cy.get('.form-field-error').eq(2).should('be.visible');

        cy.getTestSelector("contact-form-subject").find('input').clear().type('abc');
        cy.getTestSelector("contact-form-textarea").find('textarea').type('ab');
        cy.get('.contact-form button').click();
        cy.wait(4000);
        cy.getTestSelector("contact-form-success").should('not.exist');
        cy.getTestSelector("contact-form-email").verifyFormInput('Email', 'email', 'email');
        cy.getTestSelector("contact-form-subject").verifyFormInput('Subject', 'text', 'subject');
        cy.getTestSelector("contact-form-textarea").verifyFormTextArea('Your message', 'message', 'minLength');
        cy.get('.form-field-error').eq(0).should('not.be.visible');
        cy.get('.form-field-error').eq(1).should('not.be.visible');
        cy.get('.form-field-error').eq(2).should('be.visible');
        cy.getTestSelector("contact-form-textarea").find('textarea').clear().type('abcdefgs');
        cy.get("body").click(50, 250);
        cy.getTestSelector("contact-form-textarea").verifyFormTextArea('Your message', 'message');
        cy.get('.form-field-error').should('not.be.visible');
    });

    it('Verify that entering blank spaces on mandatory fields leads to validation error', function() {
        cy.getTestSelector("contact-form-subject").find('input').type('  ');
        cy.getTestSelector("contact-form-textarea").find('textarea').focus();
        cy.getTestSelector("contact-form-subject").verifyFormInput('Subject', 'text', 'subject', 'minLength');

        cy.getTestSelector("contact-form-textarea").find('textarea').type('   ');
        cy.get('.contact-form button').click();
        cy.wait(4000);
        cy.getTestSelector("contact-form-success").should('not.exist');
        cy.getTestSelector("contact-form-email").verifyFormInput('Email', 'email', 'email', 'required');
        cy.getTestSelector("contact-form-subject").verifyFormInput('Subject', 'text', 'subject', 'minLength');
        cy.getTestSelector("contact-form-textarea").verifyFormTextArea('Your message', 'message', 'minLength');

        cy.getTestSelector("contact-form-subject").find('input').clear().type(' bc');
        cy.get("body").click(50, 250);
        cy.getTestSelector("contact-form-subject").verifyFormInput('Subject', 'text', 'subject', 'minLength');

        cy.getTestSelector("contact-form-textarea").find('textarea').type('bc');
        cy.get("body").click(50, 250);
        cy.getTestSelector("contact-form-textarea").verifyFormTextArea('Your message', 'message', 'minLength');

        cy.getTestSelector("contact-form-subject").find('input').type('d');
        cy.getTestSelector("contact-form-textarea").find('textarea').focus();
        cy.getTestSelector("contact-form-subject").verifyFormInput('Subject', 'text', 'subject');
        cy.getTestSelector("contact-form-textarea").verifyFormTextArea('Your message', 'message', 'minLength');
        cy.getTestSelector("contact-form-textarea").find('textarea').type('d');
        cy.wait(4000);
        cy.getTestSelector("contact-form-success").should('not.exist');
        cy.getTestSelector("contact-form-email").verifyFormInput('Email', 'email', 'email', 'required');
        cy.getTestSelector("contact-form-subject").verifyFormInput('Subject', 'text', 'subject');
        cy.getTestSelector("contact-form-textarea").verifyFormTextArea('Your message', 'message');
        cy.get('.form-field-error').eq(0).should('be.visible');
        cy.get('.form-field-error').eq(1).should('not.be.visible');
        cy.get('.form-field-error').eq(2).should('not.be.visible');

        cy.getTestSelector("contact-form-email").find('input').type('  ');
        cy.getTestSelector("contact-form-subject").find('input').focus();
        cy.getTestSelector("contact-form-email").verifyFormInput('Email', 'email', 'email', 'required');
        cy.getTestSelector("contact-form-email").find('input').type('  abc');
        cy.get('.contact-form button').click();
        cy.getTestSelector("contact-form-email").verifyFormInput('Email', 'email', 'email', 'invalid email');
    });

    it('Verify that design of the contact form on desktop is as per requirements', function() {
        cy.getTestSelector("contact-form").find('label').each($el => {
            expect($el).to.be.visible;
            expect($el).to.have.css('color', 'rgb(255, 255, 255)');
            expect($el).to.have.css('font-size', '16px');
        });

        cy.getTestSelector("contact-form").find('input').each($el => {
            expect($el).to.be.visible;
            expect($el).to.have.css('color', 'rgb(70, 65, 65)');
            expect($el).to.have.css('background-color', 'rgb(255, 255, 255)');
            expect($el).to.have.css('font-size').match(/13/);
            expect($el).to.have.css('border', '0px none rgb(70, 65, 65)');
        });

        cy.getTestSelector("contact-form").find('textarea').each($el => {
            expect($el).to.be.visible;
            expect($el).to.have.css('color', 'rgb(70, 65, 65)');
            expect($el).to.have.css('background-color', 'rgb(255, 255, 255)');
            expect($el).to.have.css('font-size').match(/13/);
            expect($el).to.have.css('border', '0px none rgb(70, 65, 65)');
        });
    });

    it('Verify that design of the contact form on mobile is as per requirements', function() {
        cy.viewport(390, 844);
        cy.getTestSelector("contact-form").find('label').each($el => {
            expect($el).to.be.visible;
            expect($el).to.have.css('color', 'rgb(255, 255, 255)');
            expect($el).to.have.css('font-size').match(/14/);
        });

        cy.getTestSelector("contact-form").find('input').each($el => {
            expect($el).to.be.visible;
            expect($el).to.have.css('color', 'rgb(70, 65, 65)');
            expect($el).to.have.css('background-color', 'rgb(255, 255, 255)');
            expect($el).to.have.css('font-size').match(/13/);
            expect($el).to.have.css('border', '0px none rgb(70, 65, 65)');
        });

        cy.getTestSelector("contact-form").find('textarea').each($el => {
            expect($el).to.be.visible;
            expect($el).to.have.css('color', 'rgb(70, 65, 65)');
            expect($el).to.have.css('background-color', 'rgb(255, 255, 255)');
            expect($el).to.have.css('font-size').match(/13/);
            expect($el).to.have.css('border', '0px none rgb(70, 65, 65)');
        });
    });
});