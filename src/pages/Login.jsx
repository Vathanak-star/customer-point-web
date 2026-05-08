import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from '../services/users'
import { Bounce, ToastContainer,toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

export default function LoginPage(){
    const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [isLoading,setLoading] = useState(false)

    const onSignUpClick = (event) => {
        event.preventDefault()
        navigate('/register', {viewTransition: true})
    }

    const onSubmit = (event) => {
        event.preventDefault()
        setLoading(true)
        const userObj ={
            "email": email,
            "password": password
        }

        if(!email || !password){
            setLoading(false)
                toast.error('Enter email and password!', {
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
                userService.login(userObj).then(result => {

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

                    if(result.msg === 'Email not found'){
                        setLoading(false)
                        toast.error('Email not found!', {
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

                    if(result.msg === 'Invalid credentials'){
                        setLoading(false)
                        toast.error('Incorrect password!', {
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

                        setLoading(false)
                        navigate('/')
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
    }


    return (
        <div className="flex h-screen justify-center items-center bg-white sm:bg-gray-100 transition-colors duration-400">
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
                    <h1 className="flex text-2xl font-bold justify-center">Login</h1>
                    <form onSubmit={onSubmit} className="flex flex-col mt-3">
                        <div>
                            <label htmlFor="email" className="block mb-2.5 text-sm font-medium">Enter Email: </label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" className="w-full mb-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-gray-500 hover:border-gray-300 shadow-sm focus:shadow" placeholder="example@gmaill.com"/>
                        </div>

                        <div>
                            <label htmlFor="password" className="block mb-2.5 text-sm font-medium">Enter Password: </label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" className="mb-6 w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-gray-500 hover:border-gray-300 shadow-sm focus:shadow" placeholder="Password"/>
                        </div>
                        
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer transition duration-300 h-12">
                            {isLoading ? <CircularProgress aria-label="Loading…" color="inherit"  size={22}/> : "Login"}
                        </button>
                    </form>
                </div>
                
            </div>
        </div>
    )
}