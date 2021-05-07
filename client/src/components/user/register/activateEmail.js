import { useEffect , useState } from 'react'

import { useHistory, useParams } from 'react-router-dom'

import AxiosInstance from '../../../utilsClient/AxiosInstance'

const ActivateEmail = () => {

    const history = useHistory()

    const { activationToken } = useParams()

    const [ response , setResponse ] = useState('')

    useEffect(async()=>{

      const res = await AxiosInstance.post(`/user/activateEmail/${activationToken}`)

      console.log(res.data)

      res.data.success === 1 ?
             history.push('/')
           :
             setResponse(res.data.msg)
    },[])  

    return (
        <div>
            {response}
        </div>
    )
}

export default ActivateEmail
