// pages/cart.js
'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Button from '@/components/Button'

const initialCartItems = [
  {
    id: '1',
    title: 'Product 1',
    price: 100,
    quantity: 2,
    image: '/images/1.webp',
  },
  {
    id: '2',
    title: 'Product 2',
    price: 150,
    quantity: 1,
    image: '/images/2.webp',
  },
  // Add more items as needed
]

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const handleQuantityChange = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    )
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <section className="max-container padding-container py-10 pb-20">
      <h1 className="bold-32 lg:bold-40 pb-5 flex justify-center">My Cart</h1>
      <div className="flex flex-col gap-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex  bg-gray-200 p-4 rounded-lg shadow-md">
            <div className="flex-shrink-0">
              <Image
                src={item.image}
                width={150}
                height={150}
                alt={item.title}
                className="rounded"
              />
            </div>
            <div className="flex flex-col flex-grow pl-4 justify-evenly">
              <h2 className="bold-20">{item.title}</h2>
              <p className="regular-16">Price: Rs {item.price}</p>
              <div className="flex items-center mt-2">
                <label htmlFor={`quantity-${item.id}`} className="mr-2">Quantity:</label>
                <input
                  id={`quantity-${item.id}`}
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  className="w-16 p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-10">
        <h2 className="bold-20 lg:bold-32">Total: Rs {calculateTotal()}</h2>
        <Button 
          type="button"
          title="Proceed to Checkout"
          variant="btn_dark_green"
        />
      </div>
    </section>
  )
}

export default Cart
