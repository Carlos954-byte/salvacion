import axios from 'axios'

const BASE_URL = 'https://fakestoreapi.com/products'

export async function fetchProducts() {
  const res = await axios.get(BASE_URL)
  return res.data
}

export async function createProduct(data) {
  const res = await axios.post(BASE_URL, data)
  return res.data
}

export async function updateProduct(id, data) {
  const res = await axios.put(`${BASE_URL}/${id}`, data)
  return res.data
}

export async function deleteProduct(id) {
  const res = await axios.delete(`${BASE_URL}/${id}`)
  return res.data
}