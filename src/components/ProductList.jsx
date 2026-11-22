import React from "react";

export default function ProductList({
  products,
  cart,
  subtotal,
  totalQty,
  onAddToCart,
  onGoToCart,
}) {
  return (
    <section>
      <div className="row-between">
        <div>
          <h1>Products</h1>
          <p className="muted">Choose a product and click Add to Cart.</p>
        </div>
        <button className="btn-secondary" onClick={onGoToCart}>
          View Cart ({totalQty}) — ${subtotal.toFixed(2)}
        </button>
      </div>

      <div className="grid-4">
        {products.map((product) => {
          const itemInCart = cart.find((c) => c.id === product.id);
          return (
            <div key={product.id} className="card">
              <span className="badge">{product.category}</span>
              <h3>{product.name}</h3>
              <p className="price">${product.price.toFixed(2)}</p>
              <button
                className="btn-primary"
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