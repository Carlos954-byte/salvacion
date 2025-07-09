import React from 'react'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart()

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  return (
    <>
      <h3>Carrito de Compras</h3>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio Unitario</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      className="form-control"
                      style={{ width: '80px' }}
                      value={item.quantity}
                      onChange={e =>
                        updateQuantity(item.id, Number(e.target.value))
                      }
                    />
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h5>Total: ${total.toFixed(2)}</h5>
          <button className="btn btn-outline-danger" onClick={clearCart}>
            Vaciar Carrito
          </button>
        </>
      )}
    </>
  )
}