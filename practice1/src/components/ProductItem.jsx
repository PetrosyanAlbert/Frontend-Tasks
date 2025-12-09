export default function ProductItem({ product, moveToCart }) {
  return (
    <div className="product-card">
      <img src={product.photo} alt={product.title} />

      <h4>{product.title}</h4>
      <p>${product.price}</p>

      <button onClick={() => moveToCart(product)}>Add to Cart</button>
    </div>
  );
}
