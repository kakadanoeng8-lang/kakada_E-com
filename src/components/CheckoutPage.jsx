import React from "react";

export default function CheckoutPage({
  cart,
  customer,
  errors,
  shippingMethod,
  subtotal,
  shippingFee,
  grandTotal,
  onCustomerChange,
  onShippingChange,
  onPlaceOrder,
  onBackToShop,
}) {
  if (cart.length === 0) {
    return (
      <section className="card">
        <h1>Checkout</h1>
        <p className="muted">No products in cart to checkout.</p>
        <button className="btn-primary" onClick={onBackToShop}>
          Go to Products
        </button>
      </section>
    );
  }

  return (
    <section>
      <h1>Checkout</h1>

      <form onSubmit={onPlaceOrder} className="two-col" noValidate>
        <div className="card">
          <h2>Customer Information</h2>

          <div className="form-grid-2">
            <div className="field">
              <label>First Name *</label>
              <input
                type="text"
                value={customer.firstName}
                onChange={(e) =>
                  onCustomerChange("firstName", e.target.value)
                }
                placeholder="First name"
              />
              {errors.firstName && (
                <small className="error">{errors.firstName}</small>
              )}
            </div>

            <div className="field">
              <label>Last Name *</label>
              <input
                type="text"
                value={customer.lastName}
                onChange={(e) => onCustomerChange("lastName", e.target.value)}
                placeholder="Last name"
              />
              {errors.lastName && (
                <small className="error">{errors.lastName}</small>
              )}
            </div>
          </div>

          <div className="form-grid-2">
            <div className="field">
              <label>Email *</label>
              <input
                type="email"
                value={customer.email}
                onChange={(e) => onCustomerChange("email", e.target.value)}
                placeholder="email@example.com"
              />
              {errors.email && <small className="error">{errors.email}</small>}
            </div>

            <div className="field">
              <label>Phone Number *</label>
              <input
                type="tel"
                value={customer.phone}
                onChange={(e) => onCustomerChange("phone", e.target.value)}
                placeholder="012 345 678"
              />
              {errors.phone && <small className="error">{errors.phone}</small>}
            </div>
          </div>

          <div className="field">
            <label>Address *</label>
            <textarea
              rows="3"
              value={customer.address}
              onChange={(e) => onCustomerChange("address", e.target.value)}
              placeholder="Delivery address"
            />
            {errors.address && (
              <small className="error">{errors.address}</small>
            )}
          </div>

          <div className="field">
            <label>Shipping Method</label>
            <div className="shipping-options">
              <label className="radio-card">
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingMethod === "free"}
                  onChange={() => onShippingChange("free")}
                />
                <span>
                  <strong>Free Shipping</strong> ($0)
                </span>
              </label>

              <label className="radio-card">
                <input
                  type="radio"
                  name="shipping"
                  checked={shippingMethod === "express"}
                  onChange={() => onShippingChange("express")}
                />
                <span>
                  <strong>Express Shipping</strong> ($9)
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="card">
          <h2>Order Summary</h2>
          {cart.map((item) => (
            <div key={item.id} className="summary-row">
              <span>
                {item.name} × {item.qty}
              </span>
              <span>${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <hr />
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>${shippingFee.toFixed(2)}</span>
          </div>
          <hr />
          <div className="summary-row total-row">
            <strong>Grand Total</strong>
            <strong>${grandTotal.toFixed(2)}</strong>
          </div>

          <button type="submit" className="btn-primary full-width">
            Place Order
          </button>
        </div>
      </form>
    </section>
  );
}