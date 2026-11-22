import React from "react";

export default function CartPage({
  cart,
  subtotal,
  grandTotal,
  onUpdateQty,
  onRemoveItem,
  onProceedToCheckout,
  onBackToShop,
}) {
  if (cart.length === 0) {
    return (
      <section className="card">
        <h1>Shopping Cart</h1>
        <p className="muted">Your cart is empty.</p>
        <button className="btn-primary" onClick={onBackToShop}>
          Back to Products
        </button>
      </section>
    );
  }

  return (
    <section>
      <h1>Shopping Cart</h1>

      <div className="two-col">
        <div className="card">
          <h2>Items in Cart</h2>
          {cart.map((item) => (
            <div key={item.id} className="cart-row">
              <div>
                <strong>{item.name}</strong>
                <div className="muted">${item.price.toFixed(2)} each</div>
              </div>

              <div className="qty-controls">
                <button
                  className="qty-btn"
                  onClick={() => onUpdateQty(item.id, -1)}
                >
                  -
                </button>
                <span>{item.qty}</span>
                <button
                  className="qty-btn"
                  onClick={() => onUpdateQty(item.id, 1)}
                >
                  +
                </button>
              </div>

              <strong>${(item.price * item.qty).toFixed(2)}</strong>

              <button
                className="btn-danger"
                onClick={() => onRemoveItem(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="card">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <hr />
          <div className="summary-row total-row">
            <strong>Grand Total</strong>
            <strong>${grandTotal.toFixed(2)}</strong>
          </div>

          <button
            className="btn-primary full-width"
            onClick={onProceedToCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
}