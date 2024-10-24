import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ModelView from "./ModelView";
import { useEffect, useRef, useState } from "react";
import { yellowImg, ic4Img } from "../utils";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";
import { animateWithGsapTimeline } from "../utils/animations";
import { div } from "three/examples/jsm/nodes/Nodes.js";

const Model = () => {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState({
    id: 0,
    title: "15.93 cm (6.3″) iPhone 16 Pro in four colours",
    color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
    img: yellowImg,
  });

  //camera
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  //model

  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  //rotation of the model

  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  const t1 = gsap.timeline();
  useEffect(() => {
    debugger;
    if (size === "large") {
      animateWithGsapTimeline(t1, small, smallRotation, "#view1", "#view2", {
        transform: "translateX(-100%)",
        duration: 2,
      });
    }
    if (size === "small") {
      animateWithGsapTimeline(t1, large, largeRotation, "#view2", "#view1", {
        transform: "translateX(0)",
        duration: 2,
      });
    }
  });

  const parentRef = useRef(null);
  const divRef = useRef(null);

  
  useEffect(() => {
    gsap.fromTo(
      divRef.current, 
      { opacity: 0.9, y: 0, visibility: "hidden", position: "fixed" }, 
      {
        opacity: 1,
        y: 0,
        visibility: "visible",
        duration: 0.5,
        scrollTrigger: {
          trigger: parentRef.current, 
          start: "top bottom",  
          end: "bottom top",  
          toggleActions: "play none none reverse",
          scrub: true,  
          onEnter: () => {
            gsap.to(divRef.current, {
              opacity: 1,
              visibility: "visible",
              y: 0,
              position: "sticky",
              bottom: 20,  
              duration: 0.5
            });
          },
          onLeaveBack: () => {
            gsap.to(divRef.current, {
              position: "fixed",
              bottom: 20,
              duration: 0.5,
              opacity:1
            });
          },
        }
      }
    );
  }, []);
  

  useGSAP(() => {
    gsap.to("#heading", { y: 0, opacity: 1 });
  }, []);
  return (
    <section className="common-padding" ref={parentRef}>
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading" style={{ color: "white" }}>
          Take a closer look.
        </h1>
        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
          {model.id === 0 ? (
             <img
             src={ic4Img}
              style={{
                display: "block",      
                margin: "0 auto",       
                textAlign: "center"    
              }}
            />
            ) : (
              <>
                {}
                <ModelView
                  index={2}
                  groupRef={large}
                  gsapType="view2"
                  controlRef={cameraControlLarge}
                  setRotationState={setLargeRotation}
                  item={model}
                  size={size}
                />

                <ModelView
                  index={1}
                  groupRef={small}
                  gsapType="view1"
                  controlRef={cameraControlSmall}
                  setRotationState={setSmallRotation}
                  item={model}
                  size={size}
                />
              </>
            )}


            <Canvas
              className="w-full h-full"
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: "hidden",
              }
            }
              eventSource={document.getElementById("root")}
            >
              <View.Port />
            </Canvas>
          </div>

          <div
            className="mx-auto left-1 right-1 z-10 mt-10 overflow-visible w-fit"
            ref={divRef}
            style={{ bottom: "20px" }} 
          >
            <p className="text-sm font-light text-center mb-5 bg-gray-300 w-fit p-2 rounded-full">
              {model.title}
            </p>
            <div className="flex-center">
              <ul className="color-container gap-2">
                {models.map((item, i) => (
                  <div className={`rounded-full cursor-pointer w-8 h-8 flex-center ${ model.title === item.title ? 'border-blue border-1' : 'border-0'}`}>
                    <div className={`rounded-full cursor-pointer w-7 h-7 flex-center ${ model.title === item.title ? 'border-gray-700 border-1' : 'border-0'}`}>
                      <li
                      key={i}
                      className={`w-6 h-6 rounded-full shadow-top ${model.title === item.title ? 'border-sky-50' : ''} border-2`}
                      style={{ backgroundColor: item.color[0] }}
                      onClick={() =>
                        setModel(item)}
                      />
                    </div> 
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Model;
