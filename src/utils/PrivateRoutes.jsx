
import { Navigate,Outlet} from 'react-router-dom'
import userService from '../services/users'
import { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'

const PrivateRoutes = () => {
    const [valid,setValid] = useState(false)
    const [loading,setLoading] = useState(true)
  
    useEffect(() => {
      const token = localStorage.getItem('jsonwebtoken')
  
      userService.validateToken(token).then(result => {
  
        if(result.status === 'success'){
          setValid(true)
        }

        if(result.message === 'Invalid Token'){
          setValid(false)
        }


        setLoading(false)
      }).catch((err) => {
        console.log(err)
        setLoading(false)
      })
      
    },[])

    if(loading){
      return <div className='flex flex-col h-screen max-w-full justify-center items-center'>
          <CircularProgress aria-label="Loading…" color="success"  size={40}/>
          <h1 className='font-medium mt-3'>Checking for session...</h1>
        </div>
    }

    return (
        valid === true ? <Outlet/> : <Navigate to='/login'/>
    )
}

export default PrivateRoutes;