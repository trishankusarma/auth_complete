import React,{ useState , useEffect } from 'react'

import { Link , useHistory } from 'react-router-dom'

import AxiosInstance from '../../../utilsClient/AxiosInstance'

import Cookies from 'js-cookie'

const Register = () => {

    const history = useHistory()

    const [ user , setUser ] = useState({
        name:'',
        email:'',
        phoneNo:'',
        password:''
    })

    const [response , setResponse] = useState('')

    const { name , email , phoneNo , password } = user

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
        e.preventDefault()

        console.log(user)

        const config = {
            header: {
              'Content-Type': 'application/json'
            }
        }
        const res = await AxiosInstance.post( '/user/register' , user , config )
        
        console.log(res)
        
        setResponse(res.data.msg)
    }

    return (
        <div className="Login register">

          {response}


          <h2 style={{textAlign:'center',color:"beige",fontFamily:"cursive",margin:"5vh 0 2vh"}}>User Registration</h2>

       
        <form onSubmit={onSubmit}>
            <input
               name='name'
               type='text'
            //    autoComplete="off"
               value={name}
               placeholder='Enter Name'
               onChange={handleChange}
               required 
            />
            <input
               name='email'
               type='email'
               value={email}
            //    autoComplete="off"
               placeholder='Enter Email'
               onChange={handleChange}
               required 
            />
            <input
               name='phoneNo'
               type='Number'
               value={phoneNo}
            //    autoComplete="off"
               placeholder='Enter Phone Number'
               onChange={handleChange}
               required 
            />
            <input
               name='password'
               type='password'
               value={password}
            //    autoComplete="off"
               placeholder='Enter Password'
               onChange={handleChange}
               required 
            />
            <button className="button" type='submit'>
                 Register
            </button>
        </form>

        <div className="oldUser">
            Already registered ? 

            <Link to='/user/login'>
                 <span>Login</span>
            </Link>
     
        </div>
    </div>
    )
}

export default Register
