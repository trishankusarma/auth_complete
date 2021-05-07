import { useState,useEffect } from 'react'

import AxiosInstance from '../../../utilsClient/AxiosInstance'

import { useParams , useHistory } from 'react-router-dom'

import Cookies from 'js-cookie'

const ResetPass = () => {
    
    const { access_token } = useParams()
    const history = useHistory()


    useEffect(()=>{

        if(Cookies.get('authorization')){          
             history.push('/')
        }
    },[])

    const [ response , setResponse ] = useState('')

    const [ passwords , setPasswords ] = useState({
        newPassword:'',
        repeatPassword:''
    })

    const { newPassword , repeatPassword } = passwords

    const handleChange = (e)=>{
        setPasswords({
            ...passwords,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = async (e)=>{
        e.preventDefault();

        if( newPassword !== repeatPassword ){
            return setResponse('Passwords must be same')
        }

        const config = {
            header: {
              'Content-Type': 'application/json'
            }
        }
        const res = await AxiosInstance.post( '/user/updatePassword' , {
            access_token , newPassword , repeatPassword
        } , config );
        
        setResponse(res.data.msg);

        if(res.data.success===1){
            history.push('/')
        }
    }

    return (
        <div>
            <h1>Reset Password</h1>

            {response}

            <form onSubmit={onSubmit}>
        
              <input
                name='newPassword'
                type='password'
                value={newPassword}
               //autoComplete='off'
                placeholder='Enter New Password'
                onChange={handleChange}
                required 
               />

              <input
                name='repeatPassword'
                type='password'
                value={repeatPassword}
               //autoComplete='off'
                placeholder='Enter Same Password'
                onChange={handleChange}
                required 
               />
      
              <button className="button" type='submit'>
                 Reset Password
              </button>

            </form>
        
       </div>
    )
}

export default ResetPass
