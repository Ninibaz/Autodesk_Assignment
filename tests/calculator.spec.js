describe('Google Calculator Functionality', () => {

    beforeEach(() => {
      // Visit Google's homepage
      cy.visit('https://www.google.com');
      
      // Search for "calculator"
      cy.get('textarea[name="q"]').type('calculator{enter}');
      
      //Wait for the calculator to be visible
      cy.wait(2000);
    });

    it('should display the correct result for subtraction', () => {
      cy.get('div[role="button"]').contains('9').click();
      cy.get('div[role="button"]').contains('2').click();
      cy.get('div[role="button"][aria-label="minus"]').contains('-').click();
      cy.get('div[role="button"]').contains('4').click();
      cy.get('div[role="button"]').contains('7').click();
      cy.get('div[role="button"][aria-label="equals"]').contains('=').click();
      
      // Validate the result (92 - 47 = 45)
      cy.get('span.qv3Wpe').should('have.text', '45');
    });
  
    it('should display the correct result for simple addition', () => {
      cy.get('div[role="button"]').contains('1').click();
      cy.get('div[role="button"]').contains('2').click();
      cy.get('div[role="button"][aria-label="plus"]').contains('+').click();
      cy.get('div[role="button"]').contains('3').click();
      cy.get('div[role="button"]').contains('4').click();
      cy.get('div[role="button"][aria-label="equals"]').contains('=').click();
  
      // Validate the result is correct (12 + 34 = 46)
      cy.get('span.qv3Wpe').should('have.text', '46');
    });
  
    it('should display the correct result for multiplication', () => {
      cy.get('div[role="button"]').contains('5').click();
      cy.get('div[role="button"][aria-label="multiply"]').contains('×').click();
      cy.get('div[role="button"]').contains('6').click();
      cy.get('div[role="button"][aria-label="equals"]').contains('=').click();
  
      // Validate the result (5 × 6 = 30)
      cy.get('span.qv3Wpe').should('have.text', '30');
    });
  
    it('should clear the display when "AC" button is clicked', () => {
      cy.get('div[role="button"]').contains('5').click();
      cy.get('div[role="button"][aria-label="multiply"]').contains('×').click();
      cy.get('div[role="button"]').contains('3').click();
      cy.get('div[role="button"][aria-label="equals"]').contains('=').click();
      cy.get('div[role="button"][aria-label="all clear"]').contains('AC').click();
  
      // Validate that the display is cleared
      cy.get('span.qv3Wpe').should('have.text', '');
    });
  
    it('should delete the last character when "CE" button is clicked', () => {
      cy.get('div[role="button"]').contains('4').click();
      cy.get('div[role="button"]').contains('5').click();
      cy.get('div[role="button"][aria-label="clear entry"]').contains('CE').click();
  
      // Validate that the display shows '4'
      cy.get('span.qv3Wpe').should('have.text', '4');
    });
  
    it('should handle decimal values', () => {
      cy.get('div[role="button"]').contains('6').click();
      cy.get('div[role="button"][aria-label="point"]').contains('.').click();
      cy.get('div[role="button"]').contains('2').click();
      cy.get('div[role="button"][aria-label="plus"]').contains('+').click();
      cy.get('div[role="button"]').contains('3').click();
      cy.get('div[role="button"][aria-label="point"]').contains('.').click();
      cy.get('div[role="button"]').contains('5').click();
      cy.get('div[role="button"][aria-label="equals"]').contains('=').click();
  
      // Validate that the result is correct (6.2 + 3.5 = 9.7)
      cy.get('span.qv3Wpe').should('have.text', '9.7');
    });

    it('should handle multiple operations sequentially', () => {
      cy.get('div[role="button"]').contains('5').click();
      cy.get('div[role="button"][aria-label="multiply"]').contains('×').click();
      cy.get('div[role="button"]').contains('8').click();
      cy.get('div[role="button"][aria-label="equals"]').contains('=').click();
      cy.get('div[role="button"][aria-label="minus"]').contains('-').click();
      cy.get('div[role="button"]').contains('2').click();
      cy.get('div[role="button"][aria-label="equals"]').contains('=').click();
  
      // Validate that the result of (5 × 8) - 2 = 38
      cy.get('span.qv3Wpe').should('have.text', '38');
    });

    it('should display the correct result for division', () => {
      cy.get('div[role="button"]').contains('2').click();
      cy.get('div[role="button"]').contains('4').click();
      cy.get('div[role="button"][aria-label="divide"]').contains('÷').click();
      cy.get('div[role="button"]').contains('8').click();
      cy.get('div[role="button"][aria-label="equals"]').contains('=').click();
  
      // Validate the result (24 ÷ 8 = 3)
      cy.get('span.qv3Wpe').should('have.text', '3');
      //Divide a number by 0
      cy.get('div[role="button"]').contains('2').click();
      cy.get('div[role="button"][aria-label="divide"]').contains('÷').click();
      cy.get('div[role="button"]').contains('0').click();
      cy.get('div[role="button"][aria-label="equals"]').contains('=').click();
      // Validate the result (2 ÷ 0 = Infinity)
      cy.get('span.qv3Wpe').should('have.text', ' Infinity ');
    });
  });