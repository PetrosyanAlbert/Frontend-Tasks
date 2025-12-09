import ProductItem from "./ProductItem";

export default function ProductList({ products, moveToCart }) {
  return (
    <div>
      <h2>Products</h2>
      <div className="product-grid">
        {products.map(p => (
          <ProductItem 
            key={p.id}
            product={p}
            moveToCart={moveToCart}
          />
        ))}
      </div>
    </div>
  );
}
