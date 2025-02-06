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

  const handleIncrement = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  const handleDecrement = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      )
    )
  }

  const handleDelete = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <section className="flex flex-col space-x-10 md:flex-row w-full justify-between max-container padding-container py-10 pb-20">
      <div className='w-full md:w-2/3'>
        <h1 className="bold-32 lg:bold-40 pb-5 flex justify-between">
          <span>My Cart</span>
          <span className="text-gray-500">({totalItems} items)</span>
        </h1>
        <div className="flex flex-col gap-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex rounded-lg shadow-md">
              <div className="flex">
                <Image
                  src={item.image}
                  width={100}
                  height={100}
                  alt={item.title}
                  className="rounded"
                />
              </div>
              <div className="flex flex-col md:flex-row justify-between w-full px-5">
                <div className='flex flex-col justify-center'>
                  <h2 className="bold-20">{item.title}</h2>
                  <p className="regular-16">Rs {item.price}</p>
                </div>

                <div className="flex items-center mt-2">
                  <button
                    onClick={() => handleDecrement(item.id)}
                    className=" w-16 p-2 border border-black text-center rounded-l-3xl"
                  >
                    -
                  </button>
                  <span
                    className="w-16 p-2 border border-black text-center"
                  >
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleIncrement(item.id)}
                    className="w-16 p-2 border border-black text-center rounded-r-3xl"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="ml-3 p-2 text-red-500 border border-red-500 rounded-full"
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-between items-center mt-10 w-full md:w-1/3">
        <h1 className="bold-32 lg:bold-40 pb-5 flex justify-center">Summary</h1>
        <div className="flex justify-between w-full border-b-2">
          <p>Subtotal</p>
          <p>Rs {calculateTotal()}</p>
        </div>
        <div className="border-t my-2" />
        <div className="flex justify-between w-full border-b-2 ">
          <p>Tax</p>
          <p>50</p>
        </div>
        <div className="border-t my-2" />
        <div className="bold-20 lg:bold-32 flex justify-between w-full">
          <h2>Total: Rs </h2>
          <h2>{calculateTotal() + 50}</h2>
        </div>
        
        <Button 
          type="button"
          title="Proceed to Checkout"
          variant="btn_dark"
        />
      </div>
    </section>
  )
}

export default Cart
