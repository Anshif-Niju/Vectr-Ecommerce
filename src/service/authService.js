import api from "./api"

export const getUserByEmail=async (email)=>{

    const response = await api.get(`/users?email=${email}`);
    return response.data
}


export const getHomeProduct=async(limit)=>{
   
   const response=await  api.get(`/products?_${limit}`)
   return response.data

}

    