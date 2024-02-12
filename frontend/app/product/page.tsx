import Button from "@/components/Button"
import Card from "@/components/Card"
import ProductList from "@/components/ProductList"


function Product() {
  return (
    <section className="max-container padding-container flex-col gap-20 py-22 pb-32 md-gap-28 lg:py-20 xl:flex-row">
      <div className=" pb-20">
      <div className="flexBetween">
          <div>
            <h2 className="bold-32 lg:bold-40 pb-5">Trending Now</h2>
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
      </div>
          
      <div className=" pb-20 ">
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
        <div className="py-8">
          <Card />
        </div>
      </div>

    </section>
  )
}

export default Product