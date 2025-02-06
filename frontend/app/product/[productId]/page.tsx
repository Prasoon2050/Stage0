"use client"
import Button from "@/components/Button"
import Image from 'next/image'
import ProductList from "../../../constants/data"
import Link from "next/link"
import cardList from "../../../constants/data"
import Card from "@/components/Card"

function productDetails({ 
  params,
}: {
  param: {
    productId: string;
    productName: string;
  }
}) {
  return (
    <div className="max-container padding-container ">
      <div className="flex flex-col lg:flex-row py-4 pb-32 lg:py-10 space-y-8 lg:space-y-0">
  <div className="flex items-center justify-center lg:w-1/2">
    <Image
      className="rounded-2xl shadow-lg"
      src={`/images/${params.productId}.webp`}
      width={400}
      height={400}
      alt={params.productId}
    />
  </div>
  <div className="lg:w-1/2 flex flex-col items-center lg:items-start space-y-6">
    {ProductList.filter((product) => product.id === params.productId).map((product) => (
      <div key={product.id} className="text-center lg:text-left space-y-4">
        <div className="font-serif text-2xl lg:text-4xl font-bold">{product.title}</div>
        <div className="text-base text-gray-600 mt-4">{product.text}</div>
        <div className="font-mono text-2xl lg:text-3xl font-bold mt-4">Rs {product.price}</div>

        {/* Size Buttons */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-6">
          {["Sm", "Md", "L", "XL"].map((size) => (
            <Button
              key={size}
              type="button"
              title={size}
              variant="btn_white_text"
            />
          ))}
        </div>

        {/* Delivery Pin */}
        <div className="mt-4 w-full">
          <label htmlFor="deliveryPin" className="block text-lg font-medium text-gray-700">Delivery Pin Code</label>
          <input 
            id="deliveryPin" 
            type="text" 
            placeholder="Enter pin code" 
            className="mt-1 block w-full px-3 py-2 text-xl border-gray-300 rounded-md"
          />
        </div>

        {/* Product Details */}
        <div className="mt-6 text-lg text-gray-700">
          <h3 className="font-semibold">Product Details:</h3>
          <p>{product.details}</p>
        </div>

        {/* Product Description */}
        <div className="mt-6 text-lg text-gray-700">
          <h3 className="font-semibold">Product Description:</h3>
          <p>{product.description}</p>
        </div>

        {/* Artist Details */}
        <div className="mt-6 text-lg text-gray-700">
          <h3 className="font-semibold">Artist Information:</h3>
          <p>{product.artistInfo}</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center lg:justify-start gap-4 mt-6 lg:mt-0 fixed bottom-0 left-0 w-full bg-white lg:static"
        >
          <Link href="/cart">
            <Button 
              type="button"
              title="Go to Cart"
              variant="btn_white_text"
            />
          </Link>
          <Button 
            type="button"
            title="Buy Now"
            variant="btn_dark"
          />
        </div>
      </div>
    ))}
  </div>
</div>




      <div>
        <div className="pb-20">
        <div className="flexBetween">
          <div>
            <h2 className="bold-32 lg:bold-40 pb-5">Latest</h2>
          </div>
          <div>
            <Button 
              type="button"
              title="View All"
              variant="btn_white_text"
            />
          </div>
        </div>
        <div className="py-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cardList.map((product,index) => (

              <Card key={index} img={product.img} title={product.title} price={product.price} id={product.id} />

            
          ))}
        </div>
      </div>
      </div>
      
    </div>
  )
}

export default productDetails
