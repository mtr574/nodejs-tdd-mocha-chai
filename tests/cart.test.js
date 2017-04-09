const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon');
const CartSummary = require('../src/cart')
const Tax = require('../src/tax');

describe('CartSummary', () => {
    it('getSubtotal() should return 0 if no items are passed in', () => {
        let cartSummary = new CartSummary([])
        expect(cartSummary.getSubtotal()).to.equal(0)
    })

    it('getSubtotal() should return the sum of the price * quantity for all items', () => {
        let cartSummary = new CartSummary([{
            id: 1,
            quantity: 4,
            price: 50
        }, {
            id: 2,
            quantity: 2,
            price: 30
        }, {
            id: 3,
            quantity: 1,
            price: 40
        }]);

        expect(cartSummary.getSubtotal()).to.equal(300);
    });
})

describe('Tax', () => {
    beforeEach(() => {
        sinon.stub(Tax, 'calculate', (subtotal, state, done) => {
            setTimeout(() => {
                done({
                    amount: 30
                })
            }, 0);
        })
    });

    afterEach(() => {
        Tax.calculate.restore()
    });

    it('getTax() should execute the callback function with the tax amount', (done) => {
        let cartSummary = new CartSummary([{
            id: 1,
            quantity: 4,
            price: 50
        }, {
            id: 2,
            quantity: 2,
            price: 30
        }, {
            id: 3,
            quantity: 1,
            price: 40
        }]);

        cartSummary.getTax('NY', (taxAmount) => {
            expect(taxAmount).to.equal(30);
            done();
        });
    });
});