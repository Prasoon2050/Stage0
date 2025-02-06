
import HeroHeader from "@/components/HeroHeader"
import Newsletter from "@/components/Newsletter"
import ProductList from "@/components/ProductList"
import Review from "@/components/Review"

export default function Home() {
  return (
    <main>
      <div className="bg-gray-10">
        <HeroHeader />
      </div>
      
      <ProductList />
      <div className="bg-gray-10">
        <Newsletter />
      </div>
      
    </main>
  );
}
