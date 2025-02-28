import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

//call the api cart count to get a count of the items in the cart and then display that number in the cart icon
const CartIcon = () => {
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        if (!localStorage.getItem("token")) {
          setCartCount(0);
          return;
        }
        const token = localStorage.getItem("token");
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const isExpired = payload.exp * 1000 < Date.now();
          if (isExpired) {
            localStorage.removeItem("token");
            setCartCount(0);
            return;
          }
        }
        const response = await fetch("http://localhost:5000/api/cart-count", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        const data = await response.json();
        setCartCount(data)
      } catch (error) {
        console.error('Error fetching cart count:', error)
      }
    }

    fetchCartCount()
  }, [])

  return (
    <Link href='/cart' className='group relative'>
        <ShoppingBag className='w-6 h-6 group-hover:text-black hoverEffect' />
        <span className='absolute -top-1 -right-1 bg-black text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center'>{cartCount}</span>
    </Link>
  )
}

export default CartIcon