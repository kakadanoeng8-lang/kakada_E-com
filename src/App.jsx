import React, { useState } from "react";

const PRODUCTS = [
  {
    id: 1,
    name: "Laptop",
    price: 650,
    category: "Computers",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Mouse",
    price: 15,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Keyboard",
    price: 25,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Monitor",
    price: 120,
    category: "Displays",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80",
  },
];

const INITIAL_CUSTOMER = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
};

function ProductList({
  products,
  cart,
  subtotal,
  totalQty,
  onAddToCart,
  onGoToCart,
}) {
  return (
    <section>
      <div style={styles.rowBetween}>
        <div>
          <h1 style={styles.h1}>Products</h1>
          <p style={styles.muted}>Choose a product and click Add to Cart.</p>
        </div>
        <button style={styles.secondaryBtn} onClick={onGoToCart}>
          View Cart ({totalQty}) — ${subtotal.toFixed(2)}
        </button>
      </div>

      <div style={styles.grid4}>
        {products.map((product) => {
          const itemInCart = cart.find((c) => c.id === product.id);
          return (
            <div key={product.id} style={styles.card}>
              <img
                src={product.image}
                alt={product.name}
                style={styles.productImg}
              />
              <span style={styles.badge}>{product.category}</span>
              <h3 style={styles.cardTitle}>{product.name}</h3>
              <p style={styles.price}>${product.price.toFixed(2)}</p>
              <button
                style={styles.primaryBtn}
                onClick={() => onAddToCart(product)}
              >
                Add to Cart {itemInCart ? `(${itemInCart.qty})` : ""}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CartPage({
  cart,
  subtotal,
  shippingFee = 0,
  grandTotal,
  onUpdateQty,
  onRemoveItem,
  onProceedToCheckout,
  onBackToShop,
}) {
  if (cart.length === 0) {
    return (
      <section style={styles.card}>
        <h1 style={styles.h1}>Shopping Cart</h1>
        <p style={styles.muted}>Your cart is empty.</p>
        <button style={styles.primaryBtn} onClick={onBackToShop}>
          Back to Products
        </button>
      </section>
    );
  }

  return (
    <section>
      <h1 style={styles.h1}>Shopping Cart</h1>

      <div style={styles.twoCol}>
        <div style={styles.card}>
          <h2 style={styles.h2}>Items in Cart</h2>
          {cart.map((item) => (
            <div key={item.id} style={styles.cartRow}>
              <div style={styles.cartItemInfo}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={styles.cartThumb}
                />
                <div>
                  <strong>{item.name}</strong>
                  <div style={styles.muted}>${item.price.toFixed(2)} each</div>
                </div>
              </div>

              <div style={styles.qtyControls}>
                <button
                  style={styles.qtyBtn}
                  onClick={() => onUpdateQty(item.id, -1)}
                >
                  -
                </button>
                <span style={styles.qtyValue}>{item.qty}</span>
                <button
                  style={styles.qtyBtn}
                  onClick={() => onUpdateQty(item.id, 1)}
                >
                  +
                </button>
              </div>

              <strong>${(item.price * item.qty).toFixed(2)}</strong>

              <button
                style={styles.dangerBtn}
                onClick={() => onRemoveItem(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div style={styles.card}>
          <h2 style={styles.h2}>Order Summary</h2>
          <div style={styles.summaryRow}>
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <div style={styles.summaryRow}>
            <span>Shipping</span>
            <span>${shippingFee.toFixed(2)}</span>
          </div>
          <hr style={styles.hr} />
          <div style={styles.totalRow}>
            <strong>Grand Total</strong>
            <strong>${grandTotal.toFixed(2)}</strong>
          </div>

          <button
            style={styles.fullWidthPrimaryBtn}
            onClick={onProceedToCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
}

function CheckoutPage({
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
      <section style={styles.card}>
        <h1 style={styles.h1}>Checkout</h1>
        <p style={styles.muted}>No products in cart to checkout.</p>
        <button style={styles.primaryBtn} onClick={onBackToShop}>
          Go to Products
        </button>
      </section>
    );
  }

  return (
    <section>
      <h1 style={styles.h1}>Checkout</h1>

      <form onSubmit={onPlaceOrder} style={styles.twoCol} noValidate>
        <div style={styles.card}>
          <h2 style={styles.h2}>Customer Information</h2>

          <div style={styles.formGrid2}>
            <div style={styles.field}>
              <label style={styles.label}>First Name *</label>
              <input
                style={styles.input}
                type="text"
                value={customer.firstName}
                onChange={(e) => onCustomerChange("firstName", e.target.value)}
                placeholder="First name"
              />
              {errors.firstName && (
                <small style={styles.error}>{errors.firstName}</small>
              )}
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Last Name *</label>
              <input
                style={styles.input}
                type="text"
                value={customer.lastName}
                onChange={(e) => onCustomerChange("lastName", e.target.value)}
                placeholder="Last name"
              />
              {errors.lastName && (
                <small style={styles.error}>{errors.lastName}</small>
              )}
            </div>
          </div>

          <div style={styles.formGrid2}>
            <div style={styles.field}>
              <label style={styles.label}>Email *</label>
              <input
                style={styles.input}
                type="email"
                value={customer.email}
                onChange={(e) => onCustomerChange("email", e.target.value)}
                placeholder="email@example.com"
              />
              {errors.email && <small style={styles.error}>{errors.email}</small>}
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Phone Number *</label>
              <input
                style={styles.input}
                type="tel"
                value={customer.phone}
                onChange={(e) => onCustomerChange("phone", e.target.value)}
                placeholder="012 345 678"
              />
              {errors.phone && <small style={styles.error}>{errors.phone}</small>}
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Address *</label>
            <textarea
              rows="3"
              style={styles.textarea}
              value={customer.address}
              onChange={(e) => onCustomerChange("address", e.target.value)}
              placeholder="Delivery address"
            />
            {errors.address && (
              <small style={styles.error}>{errors.address}</small>
            )}
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Shipping Method</label>
            <div style={styles.shippingOptions}>
              <label style={styles.radioCard}>
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

              <label style={styles.radioCard}>
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

        <div style={styles.card}>
          <h2 style={styles.h2}>Order Summary</h2>
          {cart.map((item) => (
            <div key={item.id} style={styles.summaryRow}>
              <div style={styles.cartItemInfo}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={styles.cartThumbSm}
                />
                <span>
                  {item.name} × {item.qty}
                </span>
              </div>
              <span>${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <hr style={styles.hr} />
          <div style={styles.summaryRow}>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Shipping</span>
            <span>${shippingFee.toFixed(2)}</span>
          </div>
          <hr style={styles.hr} />
          <div style={styles.totalRow}>
            <strong>Grand Total</strong>
            <strong>${grandTotal.toFixed(2)}</strong>
          </div>

          <button type="submit" style={styles.fullWidthPrimaryBtn}>
            Place Order
          </button>
        </div>
      </form>
    </section>
  );
}

function OrderConfirmation({ order, onContinueShopping }) {
  if (!order) return null;

  return (
    <section style={styles.card}>
      <div style={styles.successBox}>
        <strong>{order.message}</strong>
      </div>

      <h1 style={styles.h1}>Order Confirmation</h1>

      <div style={styles.infoGrid}>
        <div>
          <span style={styles.muted}>Order ID</span>
          <div>
            <strong>{order.orderId}</strong>
          </div>
        </div>
        <div>
          <span style={styles.muted}>Customer Name</span>
          <div>
            <strong>{order.customerName}</strong>
          </div>
        </div>
        <div>
          <span style={styles.muted}>Order Date</span>
          <div>
            <strong>{order.orderDate}</strong>
          </div>
        </div>
        <div>
          <span style={styles.muted}>Order Status</span>
          <div>
            <span style={styles.statusPending}>{order.status}</span>
          </div>
        </div>
      </div>

      <h2 style={styles.h2}>Ordered Products</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Product</th>
            <th style={styles.th}>Unit Price</th>
            <th style={styles.th}>QTY</th>
            <th style={styles.th}>Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item) => (
            <tr key={item.id}>
              <td style={styles.td}>
                <div style={styles.cartItemInfo}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={styles.cartThumbSm}
                  />
                  <span>{item.name}</span>
                </div>
              </td>
              <td style={styles.td}>${item.price.toFixed(2)}</td>
              <td style={styles.td}>{item.qty}</td>
              <td style={styles.td}>${item.lineTotal.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.rightSummary}>
        <p style={styles.muted}>Shipping Method: {order.shippingMethod}</p>
        <p style={styles.totalAmount}>
          Total Amount: ${order.totalAmount.toFixed(2)}
        </p>
      </div>

      <button style={styles.primaryBtn} onClick={onContinueShopping}>
        Continue Shopping
      </button>
    </section>
  );
}

export default function App() {
  const [page, setPage] = useState("products");
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState(INITIAL_CUSTOMER);
  const [shippingMethod, setShippingMethod] = useState("free");
  const [errors, setErrors] = useState({});
  const [orderSeq, setOrderSeq] = useState(1);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleUpdateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const handleRemoveItem = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const handleCustomerChange = (field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateCheckout = () => {
    const nextErrors = {};
    if (!customer.firstName.trim()) {
      nextErrors.firstName = "First name is required";
    }
    if (!customer.lastName.trim()) {
      nextErrors.lastName = "Last name is required";
    }
    if (!customer.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(customer.email)) {
      nextErrors.email = "Invalid email format";
    }
    if (!customer.phone.trim()) {
      nextErrors.phone = "Phone number is required";
    }
    if (!customer.address.trim()) {
      nextErrors.address = "Address is required";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shippingFee =
    cart.length === 0 ? 0 : shippingMethod === "express" ? 9 : 0;
  const grandTotal = subtotal + shippingFee;
  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (!validateCheckout()) return;

    const orderId = `ORD-${String(orderSeq).padStart(4, "0")}`;
    const orderData = {
      message: "Order Placed Successfully!",
      orderId,
      customerName: `${customer.firstName.trim()} ${customer.lastName.trim()}`,
      customerEmail: customer.email.trim(),
      customerPhone: customer.phone.trim(),
      customerAddress: customer.address.trim(),
      orderDate: new Date().toLocaleString(),
      items: cart.map((item) => ({
        ...item,
        lineTotal: item.price * item.qty,
      })),
      subtotal,
      shippingMethod:
        shippingMethod === "express"
          ? "Express Shipping ($9)"
          : "Free Shipping ($0)",
      shippingFee,
      totalAmount: grandTotal,
      status: "Pending",
    };

    setConfirmedOrder(orderData);
    setOrderSeq((n) => n + 1);
    setCart([]);
    setCustomer(INITIAL_CUSTOMER);
    setShippingMethod("free");
    setErrors({});
    setPage("confirmation");
  };

  return (
    <div style={styles.app}>
      <nav style={styles.navbar}>
        <button
          style={{
            ...styles.navBtn,
            ...(page === "products" ? styles.navBtnActive : {}),
          }}
          onClick={() => setPage("products")}
        >
          Products
        </button>
        <button
          style={{
            ...styles.navBtn,
            ...(page === "cart" ? styles.navBtnActive : {}),
          }}
          onClick={() => setPage("cart")}
        >
          Cart ({totalQty})
        </button>
        <button
          style={{
            ...styles.navBtn,
            ...(page === "checkout" ? styles.navBtnActive : {}),
          }}
          onClick={() => setPage("checkout")}
        >
          Checkout
        </button>
      </nav>

      <main style={styles.mainContainer}>
        {page === "products" && (
          <ProductList
            products={PRODUCTS}
            cart={cart}
            subtotal={subtotal}
            totalQty={totalQty}
            onAddToCart={handleAddToCart}
            onGoToCart={() => setPage("cart")}
          />
        )}

        {page === "cart" && (
          <CartPage
            cart={cart}
            subtotal={subtotal}
            shippingFee={shippingFee}
            grandTotal={grandTotal}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveItem}
            onProceedToCheckout={() => setPage("checkout")}
            onBackToShop={() => setPage("products")}
          />
        )}

        {page === "checkout" && (
          <CheckoutPage
            cart={cart}
            customer={customer}
            errors={errors}
            shippingMethod={shippingMethod}
            subtotal={subtotal}
            shippingFee={shippingFee}
            grandTotal={grandTotal}
            onCustomerChange={handleCustomerChange}
            onShippingChange={setShippingMethod}
            onPlaceOrder={handlePlaceOrder}
            onBackToShop={() => setPage("products")}
          />
        )}

        {page === "confirmation" && (
          <OrderConfirmation
            order={confirmedOrder}
            onContinueShopping={() => setPage("products")}
          />
        )}
      </main>
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    backgroundColor: "#f4f6f9",
    color: "#111827",
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  navbar: {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    padding: "14px 24px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap",
  },
  navBtn: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    backgroundColor: "#ffffff",
    color: "#111827",
    fontWeight: 600,
    cursor: "pointer",
  },
  navBtnActive: {
    backgroundColor: "#111827",
    color: "#ffffff",
    borderColor: "#111827",
  },
  mainContainer: {
    maxWidth: "1060px",
    width: "100%",
    margin: "28px auto",
    padding: "0 20px",
  },
  h1: {
    margin: "0 0 8px",
    fontSize: "26px",
  },
  h2: {
    margin: "0 0 14px",
    fontSize: "18px",
  },
  muted: {
    color: "#6b7280",
    fontSize: "14px",
    margin: "4px 0",
  },
  hr: {
    border: "none",
    borderTop: "1px solid #e5e7eb",
    margin: "12px 0",
  },
  rowBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "20px",
  },
  grid4: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
    gap: "16px",
  },
  twoCol: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    alignItems: "start",
  },
  formGrid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "12px",
  },
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },
  productImg: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "12px",
    backgroundColor: "#f3f4f6",
  },
  badge: {
    display: "inline-block",
    alignSelf: "flex-start",
    fontSize: "12px",
    fontWeight: 600,
    backgroundColor: "#eef2ff",
    color: "#3730a3",
    padding: "4px 8px",
    borderRadius: "6px",
    marginBottom: "10px",
  },
  cardTitle: {
    margin: "0 0 8px",
    fontSize: "19px",
  },
  price: {
    fontSize: "22px",
    fontWeight: 700,
    margin: "0 0 14px",
  },
  primaryBtn: {
    backgroundColor: "#111827",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 14px",
    fontWeight: 600,
    cursor: "pointer",
  },
  fullWidthPrimaryBtn: {
    width: "100%",
    marginTop: "14px",
    backgroundColor: "#111827",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 14px",
    fontWeight: 600,
    cursor: "pointer",
  },
  secondaryBtn: {
    backgroundColor: "#ffffff",
    color: "#111827",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    padding: "10px 14px",
    fontWeight: 600,
    cursor: "pointer",
  },
  dangerBtn: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    border: "none",
    borderRadius: "6px",
    padding: "6px 10px",
    fontWeight: 600,
    cursor: "pointer",
  },
  cartRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    padding: "12px 0",
    borderBottom: "1px solid #f3f4f6",
    flexWrap: "wrap",
  },
  cartItemInfo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  cartThumb: {
    width: "52px",
    height: "52px",
    objectFit: "cover",
    borderRadius: "8px",
    backgroundColor: "#f3f4f6",
  },
  cartThumbSm: {
    width: "36px",
    height: "36px",
    objectFit: "cover",
    borderRadius: "6px",
    backgroundColor: "#f3f4f6",
  },
  qtyControls: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  qtyBtn: {
    width: "28px",
    height: "28px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    backgroundColor: "#ffffff",
    fontWeight: 700,
    cursor: "pointer",
  },
  qtyValue: {
    minWidth: "20px",
    textAlign: "center",
    fontWeight: 600,
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "8px 0",
    fontSize: "15px",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "8px 0",
    fontSize: "18px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "14px",
  },
  label: {
    fontSize: "14px",
    fontWeight: 600,
    marginBottom: "6px",
  },
  input: {
    padding: "9px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "14px",
  },
  textarea: {
    padding: "9px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "14px",
    resize: "vertical",
  },
  error: {
    color: "#dc2626",
    fontSize: "12px",
    marginTop: "4px",
  },
  shippingOptions: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "10px",
  },
  radioCard: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    padding: "10px 12px",
    cursor: "pointer",
    backgroundColor: "#ffffff",
  },
  successBox: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "12px 16px",
    borderRadius: "8px",
    marginBottom: "16px",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "14px",
    backgroundColor: "#f9fafb",
    padding: "14px",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  statusPending: {
    display: "inline-block",
    backgroundColor: "#fef3c7",
    color: "#92400e",
    padding: "4px 10px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: 600,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "16px",
  },
  th: {
    textAlign: "left",
    padding: "10px 8px",
    borderBottom: "2px solid #e5e7eb",
    fontSize: "14px",
    fontWeight: 700,
  },
  td: {
    textAlign: "left",
    padding: "10px 8px",
    borderBottom: "1px solid #e5e7eb",
    fontSize: "14px",
  },
  rightSummary: {
    textAlign: "right",
    marginBottom: "16px",
  },
  totalAmount: {
    fontSize: "18px",
    fontWeight: 700,
    margin: "6px 0 0",
  },
};