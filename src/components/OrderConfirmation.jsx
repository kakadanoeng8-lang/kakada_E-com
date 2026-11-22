import React from "react";

export default function OrderConfirmation({ order, onContinueShopping }) {
  if (!order) return null;

  return (
    <section className="card">
      <div className="success-box">
        <strong>{order.message}</strong>
      </div>

      <h1>Order Confirmation</h1>

      <div className="info-grid">
        <div>
          <span className="muted">Order ID</span>
          <div>
            <strong>{order.orderId}</strong>
          </div>
        </div>
        <div>
          <span className="muted">Customer Name</span>
          <div>
            <strong>{order.customerName}</strong>
          </div>
        </div>
        <div>
          <span className="muted">Order Date</span>
          <div>
            <strong>{order.orderDate}</strong>
          </div>
        </div>
        <div>
          <span className="muted">Order Status</span>
          <div>
            <span className="status-pending">{order.status}</span>
          </div>
        </div>
      </div>

      <h2>Ordered Products</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Unit Price</th>
            <th>QTY</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.qty}</td>
              <td>${item.lineTotal.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="right-summary">
        <p className="muted">Shipping Method: {order.shippingMethod}</p>
        <p className="total-amount">
          Total Amount: ${order.totalAmount.toFixed(2)}
        </p>
      </div>

      <button className="btn-primary" onClick={onContinueShopping}>
        Continue Shopping
      </button>
    </section>
  );
}
