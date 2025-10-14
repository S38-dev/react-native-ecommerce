import { setItem } from "../Utils/AsyncStorage"
import { nanoid } from 'nanoid/non-secure';
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
        await setItem('token', data.accessToken,1)
        await setItem('id', data.id)
        await setItem('user',data)

        return data

}

export const loadMore = async (limit, off) => {
  const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${off}`);
  const json = await res.json();
  const productsWithHeight = json.products.map(p => ({
    ...p,
    cardHeight: Math.floor(Math.random() * 80) + 170,
    key: nanoid(),
  }));
  return productsWithHeight;
};


export const searchProduct = async (input) => {
  const res =await fetch(`https://dummyjson.com/products/search?q=${input}`)
  const json = await res.json();
  const productsWithHeight = json.products.map(p => ({
    ...p,
    cardHeight: Math.floor(Math.random() * 80) + 170,
    key: nanoid(),
  }));
  return productsWithHeight;
};
