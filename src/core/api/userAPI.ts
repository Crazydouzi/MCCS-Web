import {apiType } from './apiLib.dto'
const baseUrl = "http://localhost:8080/api"
export  const userAPI:apiType={
    login:{
      url: baseUrl + "/user/userLogin",
      method:'POST'
    },
}
