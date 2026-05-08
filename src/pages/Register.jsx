import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { CircularProgress } from "@mui/material";
import userService from '../services/users'

function RegisterPage() {
    const navigate = useNavigate()
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [isLoading,setLoading] = useState(false)


    const onLoginClick = (evsent) => {
        event.preventDefault()
        navigate('/login', {viewTransition: true})
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        const userObj = {
            username: username,
            email: email,
            password: password
        }

        if(!email || !password || !username){
                    setLoading(false)
                        toast.error('Missing email,password or username!', {
                                  position: "top-right",
                                  autoClose: 3000,
                                  hideProgressBar: false,
                                  closeOnClick: false,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                  theme: "light",
                                  transition: Bounce,
                        });
        }else{
            try {
                const result = await userService.register(userObj)

                if(result.msg === "Internal server error."){
                    setLoading(false)
                    toast.error('Error server', {
                                            position: "top-right",
                                            autoClose: 3000,
                                            hideProgressBar: false,
                                            closeOnClick: false,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: "light",
                                            transition: Bounce,
                    });
                }

                if(result.msg === "Validation error"){
                    setLoading(false)
                    toast.error('Password must be 8 character!', {
                                            position: "top-right",
                                            autoClose: 3000,
                                            hideProgressBar: false,
                                            closeOnClick: false,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: "light",
                                            transition: Bounce,
                    });
                }

                if(result.msg === 'User with this email already exists'){
                    setLoading(false)
                    toast.error('Email aleady exists!', {
                                            position: "top-right",
                                            autoClose: 3000,
                                            hideProgressBar: false,
                                            closeOnClick: false,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: "light",
                                            transition: Bounce,
                    });
                }

                if(result.status === 'success'){
                    localStorage.setItem('jsonwebtoken',result.data.token)
                    navigate('/')
                }
            } catch (error) {
                console.error(error)
            }
        }
        
    }

    return (
        <div className="flex h-screen justify-center items-center bg-white sm:bg-gray-100  transition-colors duration-400">
            <ToastContainer
                                  position="top-right"
                                  autoClose={3000}
                                  hideProgressBar={false}
                                  newestOnTop={false}
                                  closeOnClick={false}
                                  rtl={false}
                                  pauseOnFocusLoss
                                  draggable
                                  pauseOnHover
                                  theme="light"
                                  transition={Bounce}
            />
            <div className="bg-white rounded-lg p-4 w-full max-w-md mx-auto">
                <div className="flex flex-col m-10">
                    <div className="w-full flex justify-center mb-2">
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/046/599/226/small/illustration-of-tire-with-oil-bottle-vector.jpg" alt=""  className="w-25 h-25"/>
                    </div>
                    <h1 className="flex text-2xl font-bold justify-center">Customer Point System</h1>
                    <h1 className="flex text-2xl font-bold justify-center">Sign Up</h1>
                    <form onSubmit={onSubmit} className="flex flex-col mt-3">
                        <div>
                            <label htmlFor="username" className="block mb-2.5 text-sm font-medium">Enter Username: </label>
                            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" id="username" name="username" className="w-full mb-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-gray-500 hover:border-gray-300 shadow-sm focus:shadow" placeholder="username"/>
                        </div>

                        <div>
                            <label htmlFor="email" className="block mb-2.5 text-sm font-medium">Enter Email: </label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" className=" w-full mb-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-gray-500 hover:border-gray-300 shadow-sm focus:shadow" placeholder="example@gmaill.com"/>
                        </div>

                        <div>
                            <label htmlFor="password" className="block mb-2.5 text-sm font-medium">Enter Password: </label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" className="mb-6 w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-gray-500 hover:border-gray-300 shadow-sm focus:shadow" placeholder="Password"/>
                        </div>
                        
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer transition duration-300 h-12">
                            {isLoading ? <CircularProgress aria-label="Loading…" color="inherit"  size={22}/> : "Register"}
                        </button>
                    </form>

                    <div className="mt-2.5 w-full flex justify-center">
                        <h2 className="text-sm">Already have an account? <span className="font-medium cursor-pointer hover:text-slate-500" onClick={onLoginClick}>Login</span></h2>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default RegisterPage;