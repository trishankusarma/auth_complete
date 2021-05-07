import { useEffect, useState } from 'react'
import {  useHistory } from 'react-router-dom'

import AxiosInstance from '../../../utilsClient/AxiosInstance'
import Cookies from 'js-cookie'

const Profile = () => {

    const history = useHistory()

    const [ user , setUser ] = useState(null)

    useEffect(()=>{

        if(!Cookies.get('authorization')){          
         
            history.push('/user/login')

            return
        }
    },[])
    
    useEffect(async()=>{
        
        const res = await AxiosInstance.get('/user')

        console.log(res)

        if(res.data.success === 1)
             setUser(res.data.user)

    },[])

    const logout = async (e) => {
        const res = await AxiosInstance.get('/user/logout')

        if(res.data.success===1 )
            history.push('/user/login')
    }

    return (
        <div>
            <h1>{user && user.name}</h1>
            <h3>{user && user.email}</h3>
            <h2>{user && user.phoneNo}</h2>

            <button onClick={logout}>Log Out</button>
        </div>
    )
}

export default Profile
