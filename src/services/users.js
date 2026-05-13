import axios from "axios";

const Route = import.meta.env.VITE_ROUTE;
const baseUrl = `${Route}/api/auth`

const login = async (userObj) => {
     const response = await axios.post(`${baseUrl}/login`,userObj).catch(function(error){
        if(error.response){
            return error.response;
        }
     });

     return response.data
}

const register = async (userObj) => {
    const response = await axios.post(`${baseUrl}/register`,userObj).catch(function(error){
        if(error.response){
            return error.response;
        }
    })
    return response.data
}

const validateToken = async (token) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    const response = await axios.get(`${baseUrl}/token`,{
        headers: headers
    }).catch(function(error){
        console.log(error.response)
        if(error.response){
            return error.response;
        }
     });


    
    return response.data
}

const users = async () => {
    const respones = await axios.get(`${baseUrl}/user`)
    return respones.data
}

export default {login,register,validateToken,users}