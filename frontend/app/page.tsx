import CTA from "@/components/CTA"
import Contact from "@/components/Contact"
import Features from "@/components/Features"
import FeaturesList from "@/components/FeaturesList"
import HeroHeader from "@/components/HeroHeader"
import Newsletter from "@/components/Newsletter"
import ProductList from "@/components/ProductList"
import Review from "@/components/Review"

export default function Home() {
  return (
    <>
      <HeroHeader />
      <Features />
      <FeaturesList />
      <ProductList />
      <Newsletter />
    </>
  );
}
