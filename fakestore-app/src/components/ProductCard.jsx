import React, { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product, onUpdate, onDelete }) {
  const { addToCart } = useCart()
  const [qty, setQty] = useState(1)
  const [editable, setEditable] = useState(false)
  const [editedTitle, setEditedTitle] = useState(product.title)
  const [editedPrice, setEditedPrice] = useState(product.price)

  function handleAddToCart() {
    addToCart(product, qty)
  }

  function handleSave() {
    onUpdate({ ...product, title: editedTitle, price: Number(editedPrice) })
    setEditable(false)
  }

  return (
    <div className="card h-100 shadow-sm">
      <img src={product.image} className="card-img-top p-3" alt={product.title} style={{height: '180px', objectFit: 'contain'}}/>
      <div className="card-body d-flex flex-column">
        {editable ? (
          <>
            <input
              type="text"
              className="form-control mb-2"
              value={editedTitle}
              onChange={e => setEditedTitle(e.target.value)}
            />
            <input
              type="number"
              className="form-control mb-2"
              value={editedPrice}
              onChange={e => setEditedPrice(e.target.value)}
            />
          </>
        ) : (
          <>
            <h6 className="card-title">{product.title}</h6>
            <p className="card-text text-muted">${product.price}</p>
          </>
        )}

        <div className="mt-auto d-flex align-items-center justify-content-between">
          <div className="input-group input-group-sm w-50">
            <input
              type="number"
              min="1"
              className="form-control"
              value={qty}
              onChange={e => setQty(Number(e.target.value))}
            />
            <button className="btn btn-outline-primary" onClick={handleAddToCart}>
              Añadir
            </button>
          </div>
          <div>
            {editable ? (
              <>
                <button className="btn btn-success btn-sm me-2" onClick={handleSave}>
                  Guardar
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setEditable(false)
                    setEditedTitle(product.title)
                    setEditedPrice(product.price)
                  }}
                >
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-warning btn-sm me-2" onClick={() => setEditable(true)}>
                  Editar
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => onDelete(product.id)}>
                  Eliminar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}