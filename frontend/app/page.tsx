
import HeroHeader from "@/components/HeroHeader"
import Newsletter from "@/components/Newsletter"
import ProductList from "@/components/ProductList"

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="bg-gray-10">
        <HeroHeader />
      </section>
      <section className="py-10">
        <ProductList />
      </section>
      <section className="bg-gray-10">
        <Newsletter />
      </section>
    </main>
  );
}
