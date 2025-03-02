"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "./Button";
import Link from "next/link";

// Sample slides (replace with your own images & text)
const heroSlides = [
  {
    id: 1,
    background: "/images/2.webp",
    title: "Discover Unique AI‑Generated T‑Shirt Designs",
    subtitle:
      "Explore our collection of AI‑designed t‑shirts that reflect your style and personality.",
  },
  {
    id: 2,
    background: "/images/3.webp",
    title: "Elevate Your Wardrobe",
    subtitle:
      "Find premium, AI‑designed tees that showcase your personal flair.",
  },
  {
    id: 3,
    background: "/images/4.webp",
    title: "Unleash Your Creativity",
    subtitle:
      "Customize designs with AI and express yourself like never before.",
  },
];

const HeroCarousel = () => {
  // react-slick settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: false,
    pauseOnClick: true,
    arrows: true,
  };

  return (
    <div className="relative w-full">
      <Slider {...settings}>
        {heroSlides.map((slide) => (
          <div key={slide.id} className="relative w-full h-[80vh]">
            {/* Background Image */}
            <img
              src={slide.background}
              alt="Hero Background"
              className="w-full h-full object-cover"
            />

            {/* Overlay with text & buttons */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center text-white px-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl mb-8 max-w-2xl">
                {slide.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/create">
                  <Button
                    type="button"
                    title="Create"
                    variant="btn_white_text"
                  />
                </Link>
                <Link href="/product">
                <Button type="button" title="Shop" variant="btn_dark" />
                </Link>
                
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroCarousel;
