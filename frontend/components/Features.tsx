import Image from 'next/image'
import Button from './Button'

const Features = () => {
  
  return (
    <div className="max-container padding-container flexBetween gap-20 py-22 pb-32 md-gap-28 lg:py-20 flex-col sm:flex-row">
      <div className="pading-container">
        <div className=" pb-8 ">
          <h5 className="bold-12">Custom</h5>
        </div>
        <div className=" pb-8 ">
          <h2 className="bold-32 lg:bold-40">Create Unique T-Shirt Designs with AI</h2>
        </div>
        <div className=" pb-8 ">
          <p>Our AI design feature uses your prompts to create one-of-a-kind t-shirt designs. Stand out from the crowd with personalized apparel that reflects your style.</p>
        </div>
        <div className="flexBetween pb-8 gap-5">
          <div>
            <div><h3 className="bold-16 lg:bold-18">Design</h3></div>
            <div><p>Choose from a wide range of design options or upload your own artwork.</p></div>
          </div>
          <div>
            <div><h3 className="bold-16 lg:bold-18">Quality</h3></div>
            <div><p>We use premium materials to ensure that your custom t-shirt is durable and comfortable.</p></div>
          </div>
        </div>
        <div className="flexStart gap-2">
        <Button 
          type="button"
          title="Create"
          variant="btn_white_text"
        />
        <Button 
          type="button"
          title="Shop"
          variant="btn_dark_green"
        />
        </div>
      </div>
      <div>
        <Image src="/Feature-img.png" alt="Image of feature Section" width={1000} height={100} />
      </div>
    </div>
  )
}

export default Features