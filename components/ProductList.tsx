import React from 'react'
import Button from './Button'
import Card from './Card'

const ProductList = () => {
  return (
    <section className="max-container padding-container gap-20 py-22 pb-32 md-gap-28 lg:py-20 flex-col sm:flex-row">
        <div className="flexBetween">
          <div>
            <h5 className="bold-12 pb-5">Discover</h5>
            <h2 className="bold-32 lg:bold-40 pb-5">Featured</h2>
            <p className=" pb-5">Explore our collection of unique ai-generated t-shirts.</p>
          </div>
          <div>
            <Button 
              type="button"
              title="View All"
              variant="btn_white_text"
            />
          </div>
        </div>
        <div className="py-8">
          <Card />
        </div>
    </section>
  )
}

export default ProductList