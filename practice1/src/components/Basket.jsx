import BasketItem from "./BasketItem";

export default function Basket({basket, increase, decrease, remove}) {
    return (
        <div>
            <h2>Basket</h2>
            <table className="basket-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {basket.map(item => (
                        <BasketItem
                            key={item.id}
                            item={item}
                            increace={increase}
                            decrease={decrease}
                            remove={remove}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}