import { useState } from 'react'

import AxiosInstance from '../../../utilsClient/AxiosInstance'

const  ForgetPass = () => {

    const [ email , setEmail ] = useState('') 
    const [ response , setResponse ] = useState('')

    const handleChange = (e)=>{
        setEmail(e.target.value)
    }

    const onSubmit = async (e)=>{
        e.preventDefault();

        const config = {
            header: {
              'Content-Type': 'application/json'
            }
        }
        const res = await AxiosInstance.post( '/user/forgetPassword' , {
            email
        } , config );

        console.log(res);
        
        setResponse(res.data.msg);
    }

    return (
        <div>
            <h1>Forget Password</h1>

            {response}

            <form onSubmit={onSubmit}>
        
              <input
                name='email'
                type='email'
                value={email}
               //autoComplete='off'
                placeholder='Enter Email'
                onChange={handleChange}
                required 
               />
      
              <button className="button" type='submit'>
                 Sent Reset Link
              </button>

            </form>
        
    </div>
    )
}

export default ForgetPass
