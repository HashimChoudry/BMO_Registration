import React from "react";
import { SLIDER_IMAGES } from "@/constants";
import Image from "next/image";

const Slider = () => {
  return (
    <section className="w-full">
      <div className="flex overflow-hidden bg-mboBg-200 mt-10 hidden ">
          <div className="flex relative min-w-full justify-evenly pt-5 pb-5 space-x-16 animate-loop-scroll">
            {SLIDER_IMAGES.map((link) => (
              <div className="w-1/5 h-40 relative" key={link.alt}>
                <Image
                  alt={link.alt}
                  src={link.link}
                  fill
                  key={link.alt}
                  objectFit="contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
          <div className="flex min-w-full relative justify-evenly pt-10 pb-10 space-x-16 animate-loop-scroll">
            {SLIDER_IMAGES.map((link) => (
              <div className="w-1/5 h-40 relative" key={link.link}>
                <Image
                  alt={link.alt}
                  src={link.link}
                  fill
                  key={link.alt}
                  objectFit="contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
      </div>
    </section>
  );
};

export default Slider;
