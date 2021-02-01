import axios from 'axios'

export const createClient = async (data) => {
  await axios.post('http://localhost:3001/clients', data)
}

export const updateClient = async (data, id) => {
  await axios.put(`http://localhost:3001/clients/${id}`, data)
}

export const deleteClient = async (id) => {
  await axios.delete(`http://localhost:3001/clients/${id}`)
}
