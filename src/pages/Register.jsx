import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

function RegisterPage() {
    const navigate = useNavigate()
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')


    const onLoginClick = (event) => {
        event.preventDefault()
        navigate('/login', {viewTransition: true})
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
                        <img src="https://img.freepik.com/premium-vector/dashboard-admin-icon-user-panel_946691-647.jpg" alt=""  className="w-20 h-20"/>
                    </div>
                    <h1 className="flex text-2xl font-bold justify-center">Admin Dashboard</h1>
                    <h1 className="flex text-2xl font-bold justify-center">Sign Up</h1>
                    <form onSubmit={() => {}} className="flex flex-col mt-3">
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
                        
                        <input type="submit" value="Submit"  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer transition duration-300"/>
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