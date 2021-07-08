import axios from 'axios'

import {SetUser} from '../components/Navigator'; 
import {global_setData} from '../components/Todo'; 

const baseUrl = 'http://localhost:3001'
export let data={username:"",password:"",lists:"[]"}
export function signIn(username,password,onSuccess,onFailure) {
    data={username:"",password:"",lists:"[]"}
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
            data=response.data
            global_setData(response.data)
            
           
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

    export function update(user,onSuccess,onFailure) {
        console.log("update")
        const request = axios.put(`${baseUrl}/api/update/user`,JSON.stringify(user),
        {headers: {
          // Overwrite Axios's automatically set Content-Type
          'Content-Type': 'application/json'
        }
      })
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



