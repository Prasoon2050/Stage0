import Image from 'next/image'
import React from 'react'
import Button from './Button'

const Newsletter = () => {
  return (
    <section className="max-container padding-container flex gap-20 py-22 pb-32 md-gap-28 lg:py-20">
      <div>
        <h2 className="bold-32 lg:bold-40 pb-8">Stay Updated with New Designs</h2>
        <p className="pb-8">Subscribe to our newsletter for the latest design possibilities and special offers.</p>

        <form className="flex items-center gap-2 w-full max-w-[500px] pb-8 ">
        <input
          type="email"
          placeholder="Your email"
          required
          className="border w-3/4 p-2 focus-within:outline-blue-200"
        />
        <Button 
          type="button"
          title="Subscribe"
          variant="btn_dark_green"
        />
        </form>

        <p className="regular-14 pb-8">By subscribing, you agree to our Terms and Conditions.</p>
      </div>
      <div>
        <Image src="/Newsletter.gif" alt="Newsletter picture" width={600} height={400} />
      </div>
    </section>
  )
}

export default Newsletter