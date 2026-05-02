import axios from "axios";

const Route = import.meta.env.VITE_ROUTE;
const baseUrl = `${Route}/api`

const fetchAllCustomer = async () => {
    const response = await axios.get(`${baseUrl}/customer`)
    return response.data
}

const createCustomer = async (customerObj) => {
    const response = await axios.post(`${baseUrl}/createCustomer`,customerObj)
    return response.data
}

const updateCustomer = async (customerObj,id) => {
    const response = await axios.post(`${baseUrl}/updateCustomer/${id}`,customerObj)
    return response.data
}

const deleteCustomer = async (id) => {
    const response = await axios.delete(`${baseUrl}/deleteCustomer/${id}`)
    return response.data
}

export default {fetchAllCustomer,createCustomer,updateCustomer,deleteCustomer}