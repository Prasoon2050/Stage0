"use client";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { useEffect, useState } from "react";

function Product() {
  interface Product {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
  }

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/product/");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="max-container padding-container flex-col gap-20 md-gap-28 xl:flex-row">
      <div className="pb-20 ">
        <div className="flexBetween">
          <div>
            <h2 className="bold-32 lg:bold-40 pb-5">Trending Now</h2>
          </div>
          <div>
            <Button type="button" title="View All" variant="btn_white_text" />
          </div>
        </div>
        <div className="py-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {products.map((product, index) => (
            <Card
              key={index}
              img={product.imageUrl}
              title={product.name}
              price={product.price}
              id={product._id}
            />
          ))}
        </div>
      </div>

      <div className="pb-20">
        <div className="flexBetween">
          <div>
            <h2 className="bold-32 lg:bold-40 pb-5">Latest</h2>
          </div>
          <div>
            <Button type="button" title="View All" variant="btn_white_text" />
          </div>
        </div>
        <div className="py-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <Card
              key={index}
              img={product.imageUrl}
              title={product.name}
              price={product.price}
              id={product._id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Product;
