'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import Button from './Button'
import Cards from './Card'

const ProductList = () => {
  
    interface Product {
      _id: string;
      name: string;
      price: number;
      imageUrl: string;
    }

    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch('http://localhost:5000/product/category/Fashion')
          const data = await response.json()
          setProducts(data)
        } catch (error) {
          console.error('Error fetching products:', error)
        }
      }

      fetchProducts()
    }, [])

  return (
    <section className="max-container padding-container gap-20 py-22 pb-32 md-gap-28 lg:py-20 flex-col sm:flex-row">
        <div className="flex flexBetween">
          <div>
            <h2 className="bold-32 lg:bold-40 pb-5">Featured</h2>
          </div>
          <div>
            <Button 
              type="button"
              title="View All"
              variant="btn_dark"
            />
          </div>
        </div>
        <div className="flex gap-6 overflow-x-scroll flex-nowrap scrollbar-hide">
        {products.map((product) => (
            <Cards key={product._id} img={product.imageUrl} title={product.name} price={product.price} id={product._id} />
          ))}
        </div>
    </section>
  )
}

export default ProductList