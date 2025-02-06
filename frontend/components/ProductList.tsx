import React from 'react'
import Button from './Button'
import cardList from "../constants/data"
import Cards from './Card'

const ProductList = () => {
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
        {cardList.map((product, index) => (
            <Cards key={index} img={product.img} title={product.title} price={product.price} id={product.id} />
          ))}
        </div>
    </section>
  )
}

export default ProductList