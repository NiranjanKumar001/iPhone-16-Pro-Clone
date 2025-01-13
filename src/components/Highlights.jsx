import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";
import { rightImg, watchImg } from "../utils";
import VideoCarousel from "./VideoCarousel";

const Highlights = () => {
  useGSAP(() => {
    gsap.to("#title", { opacity: 1, y: 0 });
    gsap.to(".link", { opacity: 1, y: 0, duration: 1, stagger: 0.25 });
  }, []);

  return (
    <section
      id="highlights"
      className="w-screen overflow-hidden h-full common-padding bg-[#1D1D1F]"
    >
      <div className="screen-max-width mb-48"> 
        <div className="mb-8 w-full md:flex items-end justify-between mt-80">
          <h1
            id="title"
            className="section-heading lg:mb-[4rem] sm:mb-2"
            style={{ color: "#ffffff" }}
          >
            Get the highlights.
          </h1>
          <div className="flex flex-wrap items-end gap-5 lg:mb-[4rem] sm:mb-2 sm:text-xs">
            <p className="link">
              Watch the film
              <img src={watchImg} alt="watch" className="ml-2" />
            </p>
          </div>
        </div>
        <VideoCarousel />
      </div>
    </section>
  );
};

export default Highlights;
