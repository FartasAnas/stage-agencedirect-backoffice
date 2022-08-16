import { createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials , logOut } from '../../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl:'http://localhost:8090/api',
    mode:'cors',
    credentials: 'include',
    prepareHeaders: (headers , { getState }) => {
        const token = getState().auth.token
        if(token){
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers 
    }
})
const baseQueryWithReauth=async(args,api,extraOptions)=>{
    let result=await baseQuery(args,api,extraOptions)
    if(result?.error?.originalStatus===403){
        console.log("sending refresh token")
        const refreshResult=await baseQuery('/agent/token/refresh',api,extraOptions)
        console.log("refresh result",refreshResult)
        if(refreshResult?.data){
            const user = api.getState().auth.user
            api.dispatch(setCredentials(...refreshResult.data, user))
            result=await baseQuery(args,api,extraOptions)
        }else{
            api.dispatch(logOut())
        }
    }
    return result
}
export const apiSlice = createApi({
    baseQuery:baseQueryWithReauth,
    endpoints: builder => ({})
})