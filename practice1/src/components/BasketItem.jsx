export default function BasketItem({item, increace, decrease, remove}) {
    return (
        <tr>
            <td>{item.title}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
            <td>{(item.price * item.quantity).toFixed(2)}</td>
            <td>
                <button className="btn" onClick={() => increace(item.id)}>+</button>
                <button className="btn" onClick={() => decrease(item.id)}>-</button>
                <button className="btn remove" onClick={() => remove(item.id)}>x</button>
            </td>
        </tr>
    )
}
