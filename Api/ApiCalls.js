import { setItem } from "../Utils/AsyncStorage"

export const Login=async (email,password)=>{
      const res = await fetch('https://dummyjson.com/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
    
            // username: 'emilys',
            // password: 'emilyspass',
            username: email,
            password: password,
            expiresInMins: 30,
          }),
          credentials: 'include'
        })
        const data = await res.json()

        console.log(data.accessToken)
        await setItem('token', data.accessToken)

        return data

}