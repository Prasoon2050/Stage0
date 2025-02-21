import Image from "next/image";
import React from "react";

const FeaturesList = () => {
  return (
    <div className="max-container padding-container flex-col gap-20 py-22 pb-32 md-gap-28 lg:py-20">
      <div>
        <h2 className="align-centre bold-32 lg:bold-40 px-20 pt-16 md:px-56 xl:px-80">
          Create Your Unique T-Shirt Design with AI
        </h2>
        <p className="regular-16 align-centre px-20 py-8 md:px-56">
          Designing a t-shirt has never been easier. Our AI-powered platform
          allows you to bring your ideas to life by simply choosing a style,
          entering a prompt, and customizing the design.
        </p>
      </div>
      <div className="flex flexBetween padding gap-20 justify-items-center ">
        <div>
          <div>
            <Image
              src="/FeatureList-logo.png"
              alt="Feature List logo"
              width={300}
              height={100}
            />
            <h4 className="bold-16 lg:bold-18">Express Yourself with Style</h4>
            <p>Choose from a wide range of AI-designed t-shirt templates.</p>
          </div>
          <div>
            <Image
              src="/FeatureList-logo.png"
              alt="Feature List logo"
              width={300}
              height={100}
            />
            <h4 className="bold-16 lg:bold-18">Easy Customization Process</h4>
            <p>Personalize your t-shirt with just a few clicks.</p>
          </div>
        </div>

        <div>
          <Image
            src="/Tshirt.gif"
            alt="Feature List logo"
            width={500}
            height={100}
          />
        </div>
        <div>
          <div>
            <Image
              src="/FeatureList-logo.png"
              alt="Feature List logo"
              width={300}
              height={100}
            />
            <h4 className="bold-16 lg:bold-18">Fast and Reliable Shipping</h4>
            <p>Get your custom t-shirt delivered right to your doorstep.</p>
          </div>
          <div>
            <Image
              src="/FeatureList-logo.png"
              alt="Feature List logo"
              width={300}
              height={100}
            />
            <h4 className="bold-16 lg:bold-18">Quality Guaranteed</h4>
            <p>
              We use premium materials to ensure the highest quality for your
              t-shirts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesList;
