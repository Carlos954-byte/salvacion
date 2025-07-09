import React, { useEffect, useState } from 'react'
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../api/products'
import ProductCard from '../components/ProductCard'

export default function Dashboard() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newPrice, setNewPrice] = useState('')

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    setLoading(true)
    try {
      const data = await fetchProducts()
      setProducts(data)
      setError(null)
    } catch (err) {
      setError('Error cargando productos')
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate(e) {
    e.preventDefault()
    if (!newTitle || !newPrice) return
    try {
      const newProduct = await createProduct({
        title: newTitle,
        price: Number(newPrice),
        description: 'Nuevo producto',
        image: 'https://via.placeholder.com/150',
        category: 'others',
      })
      setProducts(prev => [...prev, newProduct])
      setNewTitle('')
      setNewPrice('')
    } catch {
      alert('Error creando producto')
    }
  }

  async function handleUpdate(updatedProduct) {
    try {
      await updateProduct(updatedProduct.id, updatedProduct)
      setProducts(prev =>
        prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
      )
    } catch {
      alert('Error actualizando producto')
    }
  }

  async function handleDelete(id) {
    try {
      await deleteProduct(id)
      setProducts(prev => prev.filter(p => p.id !== id))
    } catch {
      alert('Error eliminando producto')
    }
  }

  if (loading) return <p>Cargando productos...</p>
  if (error) return <p className="text-danger">{error}</p>

  return (
    <>
      <h3>Dashboard - Productos</h3>
      <form className="mb-4 d-flex gap-2" onSubmit={handleCreate}>
        <input
          type="text"
          className="form-control"
          placeholder="Título nuevo producto"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          required
        />
        <input
          type="number"
          className="form-control"
          placeholder="Precio"
          value={newPrice}
          onChange={e => setNewPrice(e.target.value)}
          required
          min="0"
          step="0.01"
        />
        <button className="btn btn-success" type="submit">
          Crear
        </button>
      </form>

      <div className="row row-cols-1 row-cols-md-4 g-4">
        {products.map(product => (
          <div key={product.id} className="col">
            <ProductCard
              product={product}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          </div>
        ))}
      </div>
    </>
  )
}