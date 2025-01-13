import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);
  const scrollContainerRef = useRef(null);
  const animationRef = useRef(null);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);
  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;
  // pop ups
  //remove the ease option if you dont want the bouncing effect
  useGSAP(() => {
    gsap.from("#playBar", {
      delay: 0,
      duration: 0.75,
      opacity: 0,
      scale: 0,
      ease: "bounce.inOut",
      bottom: "-130px",
      scrollTrigger: {
        trigger: "#slider",
        start: "top bottom",
        end: "70% 20%",
        toggleActions: "restart reset resume reset",
      },
    });
  });

  useGSAP(() => {
    if (scrollContainerRef.current) {
      const scrollAmount =
        window.innerWidth < 760
          ? videoId * (scrollContainerRef.current.offsetWidth * 1.04)
          : videoId * scrollContainerRef.current.offsetWidth;

      scrollContainerRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((prev) => ({
          ...prev,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    cleanupAnimations();

    if (span[videoId]) {
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);

          if (progress !== currentProgress) {
            currentProgress = progress;

            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw" // mobile
                  : window.innerWidth < 1200
                  ? "10vw" // tablet
                  : "4vw", // desktop
            });

            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },

        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      animationRef.current = anim;

      if (videoId === 0) {
        anim.restart();
      }

      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration
        );
      };

      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }

      return () => {
        gsap.ticker.remove(animUpdate);
        anim.kill();
      };
    }
  }, [videoId, startPlay]);

  useEffect(() => {
    if (loadedData.length === hightlightsSlides.length) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const slideWidth = container.offsetWidth;
      const currentSlide = Math.round(container.scrollLeft / slideWidth);
      if (
        currentSlide !== videoId &&
        !(isEnd && currentSlide === hightlightsSlides.length - 2)
      ) {
        handleProcess("change", currentSlide);
      }
    };
    container.addEventListener("scrollend", handleScroll);
    return () => container.removeEventListener("scrollend", handleScroll);
  }, [videoId]);


  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        if (i < hightlightsSlides.length - 1) {
          setVideo((prev) => ({ ...prev, isEnd: true, videoId: i + 1 }));
        } else {
          // If last item reached
          setVideo((prev) => ({ ...prev, isLastVideo: true }));
        }
        break;

      case "video-last":
        setVideo((prev) => ({ ...prev, isLastVideo: true }));
        break;

      case "video-reset":
        setVideo((prev) => ({ ...prev, videoId: 0, isLastVideo: false }));
        break;

      case "pause":
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;

      case "play":
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;

      case "change":
        handleChangeSlide(i);
        break;

      default:
        return video;
    }
  };

  const cleanupAnimations = () => {
    if (animationRef.current) {
      animationRef.current.kill();
    }

    hightlightsSlides.forEach((_, index) => {
      if (videoSpanRef.current[index]) {
        gsap.killTweensOf(videoSpanRef.current[index]);
        videoSpanRef.current[index].style.width = "0%";
        videoSpanRef.current[index].style.backgroundColor = "#afafaf";
      }

      if (videoDivRef.current[index]) {
        gsap.killTweensOf(videoDivRef.current[index]);
        videoDivRef.current[index].style.width = "12px";
      }

      if (videoRef.current[index]) {
        videoRef.current[index].pause();
        videoRef.current[index].currentTime = 0;
      }
    });
  };

  const handleChangeSlide = (i) => {
    if (i != videoId) {
      cleanupAnimations();
      setVideo((prev) => ({
        ...prev,
        isEnd: true,
        videoId: i,
        startPlay: false,
        isPlaying: false,
      }));
    }
  };

  const handleLoadedMetaData = (i, e) => setLoadedData((prev) => [...prev, e]);

  return (
    <>
      <div
        ref={scrollContainerRef}
        className="h-screen sm:h-[500px] md:h-[600px] lg:h-[680px] w-full overflow-x-auto overflow-y-hidden flex 
          snap-x snap-mandatory scroll-smooth hide-scrollbar"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {hightlightsSlides.map((list, i) => (
          <div
            key={list.id}
            id="slider"
            className="video-carousel_container relative rounded-3xl overflow-hidden bg-black w-[90vw] sm:w-[86vw] lg:w-[82vw] xl:w-[78vw] 
              h-[100%] mr-5 flex-shrink-0 snap-center"
          >
            <video
              id="video"
              playsInline={true}
              className={`pointer-events-none object-cover w-auto
                ${
                  list.id == 1
                    ? "mt-[25%] sm:mt-[30%] lg:mt-0 h-[75%] lg:h-[100%]"
                    : "h-[100%]"
                } 
              `}
              preload="auto"
              muted
              ref={(el) => (videoRef.current[i] = el)}
              onEnded={() =>
                i !== hightlightsSlides.length - 1
                  ? handleProcess("video-end", i)
                  : handleProcess("video-last")
              }
              onPlay={() => setVideo((prev) => ({ ...prev, isPlaying: true }))}
              onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
            >
              <source src={list.video} type="video/mp4" />
            </video>

            <div
              className="absolute top-12 left-1/2 transform -translate-x-1/2 lg:left-[5%] lg:translate-x-0 z-10 
              w-[70%] sm:w-[50%] md:w-[40%] lg:w-[34%] text-center lg:text-left"
            >
              <p className="text-base sm:text-lg md:text-2xl lg:text-3xl font-medium">
                {list.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Play bar */}
      <div
        id="playBar"
        className="fixed m-auto bottom-8 sm:bottom-10 left-1 right-1 z-10 flex-center mt-10 overflow-visible"
      >
        <button className="control-btn w-12 h-12 sm:w-12 sm:h-12">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
            className="w-full h-full"
          />
        </button>

        <div className="flex-center py-4 px-5 sm:py-5 sm:px-7 mx-4 bg-gray-300 backdrop-blur rounded-full">
          {hightlightsSlides.map((_, i) => (
            <span
              key={i}
              className="mx-1.5 w-2.5 h-2.5 sm:mx-2 sm:w-3 sm:h-3 bg-gray-200 rounded-full relative cursor-pointer"
              onClick={() => handleProcess("change", i)}
              ref={(el) => (videoDivRef.current[i] = el)}
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoCarousel;
