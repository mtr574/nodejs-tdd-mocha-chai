const Tax = require('./tax');

/**
 * Should return cart's sub-total amount
 */
class CartSummary {
    // init cart with given items
    constructor(items) {
        this._items = items
    }
    // return cart sub-total price
    getSubtotal() {
        if (this._items.length) {
            return this._items.reduce((subtotal, item) => {
                return subtotal += (item.quantity * item.price)
            }, 0)
        } else {
            return 0;
        }
    }
    // call tax callback function
    getTax(state, done) {
        Tax.calculate(this.getSubtotal(), state, (taxInfo) => {
            done(taxInfo.amount);
        });
    };
}

module.exports = CartSummary;