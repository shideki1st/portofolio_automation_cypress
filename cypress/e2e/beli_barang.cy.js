describe('Jago Institute Store - Purchase Test', () => {

    beforeEach(() => {
        cy.visit('https://store.jagoinstitute.biz.id/');
    });

    it('Positive Case - Successful Purchase', () => {
        // Navigate to shop page
        cy.visit('https://store.jagoinstitute.biz.id/shop/');

        // Select the first product from the list
        cy.get('#img.attachment-woocommerce_thumbnail.size-woocommerce_thumbnail').first().click();

        // Add product to cart
        cy.get('#add-to-cart').click();

        // Open cart
        cy.get('#div.aux-shopping-basket.aux-phone-off.aux-action-on-hover').click();

        // Proceed to checkout
        cy.get('#span.aux-text').click();

        // Fill in purchase information
        cy.get('input#name').type('Nama Pengguna');
        cy.get('input#email').type('user@example.com');
        cy.get('input#address').type('Alamat Pembeli');

        // Confirm purchase
        cy.get('button.confirm').click();

        // Verify success message
        cy.get('div.success-message').should('contain.text', 'Pembelian berhasil!');
    });

    it('Negative Case - Missing Payment Information', () => {
        // Navigate to shop page
        cy.visit('https://store.jagoinstitute.biz.id/shop/');

        // Select the first product from the list
        cy.get('button aux-ajax-add-to-cart product_type_simple add_to_cart_button').first().click();

        // Add product to cart
        cy.get('button.add-to-cart').click();

        // Open cart
        cy.get('a.cart-icon').click();

        // Proceed to checkout
        cy.get('button.checkout').click();

        // Fill in purchase information without name
        cy.get('input#email').type('user@example.com');
        cy.get('input#address').type('Alamat Pembeli');

        // Confirm purchase
        cy.get('button.confirm').click();

        // Verify error message
        cy.get('div.error-message').should('contain.text', 'Nama harus diisi!');
    });
});