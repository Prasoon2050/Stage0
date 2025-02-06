import Button from './Button'

const HeroHeader = () => {
  return (
    <section className="max-container padding-container flex-col gap-20 py-22 pb-32 md-gap-28 lg:py-20 xl:flex-row">
      <h1 className="align-centre bold-40 lg:bold-52 px-20 pt-16 ">Discover Unique AI-Generated T-Shirt Designs</h1>
      <p className="regular-16 align-centre px-20 py-8 ">Explore our collection of AI-designed t-shirts that reflect your style and personality.</p>

      <div className="flexCenter gap-2 flex-col sm:flex-row pb-16 ">
        <Button 
          type="button"
          title="Create"
          variant="btn_white_text"
        />
        <Button 
          type="button"
          title="Shop"
          variant="btn_dark"
        />
      </div>

    </section>
  )
}

export default HeroHeader