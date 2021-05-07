import React,{ useState , useEffect } from 'react'

import { Link , useHistory } from 'react-router-dom'

import AxiosInstance from '../../../utilsClient/AxiosInstance'

import Cookies from 'js-cookie'

const Login = () => {

    const history = useHistory()

    const [ user , setUser ] = useState({
        email:'',
        password:''
    })

    const [response , setResponse] = useState('')

    const {  email , password } = user

    const handleChange = (e)=>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }

    useEffect(()=>{

            if(Cookies.get('authorization')){          
                 history.push('/')
            }
    },[])

    const onSubmit = async (e)=>{
        e.preventDefault();

        const config = {
            header: {
              'Content-Type': 'application/json'
            }
        }
        const res = await AxiosInstance.post( '/user/login' , user , config );

        console.log(res);
        
        setResponse(res.data.msg);
    }

    return (
        <div className="Login">

            <h2 style={{textAlign:'center',color:"beige",fontFamily:"cursive",margin:"5vh 0 2vh"}}>Customer Login</h2>
            
            { response }

        <form onSubmit={onSubmit}>
        
            <input
               name='email'
               type='email'
               value={email}
            //    autoComplete='off'
               placeholder='Enter Email'
               onChange={handleChange}
               required 
            />
            <input
               name='password'
               type='password'
            //    autoComplete='off'
               value={password}
               placeholder='Enter Password'
               onChange={handleChange}
               required 
            />
          
            <button className="button" type='submit'>
                Login
            </button>
        </form>

        <div className="forgotPass">
            
            <Link to='/user/forgetPassword'>
                Forgot Password ? 
            </Link>
        </div>

        <div className="newUser">
            Not an User ? 
           
            <Link to='/user/register'>
                <span>Register</span>
            </Link>
        
        </div>
        
    </div>
    )
}

export default Login
