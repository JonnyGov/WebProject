import axios from 'axios'

import {SetUser} from '../components/Navigator'; 

const baseUrl = 'http://localhost:3001'

export function signIn(username,password,onSuccess,onFailure) {
    const request = axios.get(`${baseUrl}/api/login/:${username}/:${password}`,  { crossdomain: true })
        return request.then((response) => {
        console.log(response.data)
        if (response.data==null)
        {
            onFailure()
            SetUser({name:"guest",isLog:false})
        }
        else
        {
            onSuccess()
            SetUser({name:username,isLog:true})
           
        }
        
        

    }).catch(error => console.log(error))
  }


  export function register(username,password,onSuccess,onFailure) {
    const request = axios.post(`${baseUrl}/api/register/:${username}/:${password}`,  { crossdomain: true })
    return request.then((response) => {
        console.log(response.data)
        if (response.data==null)
        {
            onFailure()
        }
        else
        {
            onSuccess()
        }
    }).catch(error => console.log(error))
  }


