"use client"
import Button from "@/components/Button"
import Image from 'next/image'
import ProductList from "../../../constants/data"

function productDetails({ 
    params,
}: {
    param: {
      productId: string;
      productName: string;
    }
}) {
  return (
    <div className="max-container padding-container flex flex-col items-center lg:flex-row lg:justify-evenly py-2 pb-32  lg:py-10 ">
      <div className="flex items-center " >
      <Image
      src={`/images/${params.productId}.webp`}
      width={400}
      height={400}
      alt={params.productId}
    />
      </div>
      <div className="">
      {ProductList.filter((product) => product.id === params.productId).map((product) => (
          <div key={product.id} className="flex flex-col  items-center lg:items-start"> 
            <div className="align-centre bold-40 font-serif lg:bold-52">{product.title}</div>
            <div className="regular-16 align-centre">{product.text}</div>
            <div className="align-centre bold-32 font-mono lg:bold-40">Rs {product.price}</div>
            <div className="align-center mt-4">
              <label htmlFor="size" className="block regular-16 font-medium text-gray-700">Size</label>
              <select id="size" name="size" className="mt-1 block w-full pl-3 pr-10 py-2 text-2xl border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
                <option>Extra Large</option>
              </select>
            </div>
            <div className="flexBetween gap-2">
            <Button 
            type="button"
            title="Cart"
            variant="btn_white_text"
            />
            <Button 
            type="button"
            title="Buy"
            variant="btn_dark_green"
            />
            </div>
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default productDetails