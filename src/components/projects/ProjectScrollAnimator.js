import Classes from "./ProjectScrollAnimator.module.css";
import useEmblaCarousel from "embla-carousel-react";
import {
  DotButton,
  PrevButton,
  NextButton,
} from "./EmblaCarouselArrowDotButton";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import Project from "./Project";
import { useSelector } from "react-redux";

const ProjectScrollAnimator = ({ projects }) => {
  const isMobileView = useSelector((state) => state.appData.isMobileView);
  const options = { align: "start", dragFree: true, loop: true };
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [, setScrollSnaps] = useState([]);

  const projectCount = projects.length;
  const dotViewLimit = 6;
  const minLimitOfMobileViewScroll = 1;
  const minLimitOfDesktopViewScroll = 1;

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <>
      {projects && (
        <div className={`${Classes.project_container__carousel}`}>
          <div className={`${Classes.embla}`}>
            <div className={`${Classes.embla__viewport}`} ref={emblaRef}>
              <div className={`${Classes.embla__container}`}>
                {projects
                  .filter((item) => {
                    return item.isActive === true;
                  })
                  .sort((a, b) => a.order - b.order)
                  .map((project, index) => (
                    <div
                      className={`${Classes.embla__slide} ${
                        isMobileView ? "max-w-xs text-xs" : "max-w-sm text-sm"
                      }`}
                      key={index}
                    >
                      {project && <Project projectInfo={project} />}
                    </div>
                  ))}
              </div>
            </div>
            {projectCount > dotViewLimit &&
              !isMobileView &&
              projectCount > minLimitOfDesktopViewScroll && (
                <>
                  <div className={`${Classes.embla__button_Left}`}>
                    <PrevButton
                      onClick={scrollPrev}
                      disabled={prevBtnDisabled}
                    />
                  </div>
                  <div className={`${Classes.embla__button_Right}`}>
                    <NextButton
                      onClick={scrollNext}
                      disabled={nextBtnDisabled}
                    />
                  </div>
                </>
              )}

            {isMobileView &&
              projectCount > minLimitOfMobileViewScroll &&
              projectCount > minLimitOfDesktopViewScroll && (
                <div className={`${Classes.embla__buttons}`}>
                  <PrevButton onClick={scrollPrev} disabled={prevBtnDisabled} />
                  <NextButton onClick={scrollNext} disabled={nextBtnDisabled} />
                </div>
              )}

            {!isMobileView &&
              projectCount <= dotViewLimit &&
              projectCount > minLimitOfDesktopViewScroll && (
                <div className={`${Classes.embla__dots} mt-8`}>
                  {projects.map((_, index) => (
                    <DotButton
                      key={index}
                      onClick={() => scrollTo(index)}
                      className={`${Classes.embla__dot.concat(
                        index === selectedIndex ? " embla__dot--selected" : ""
                      )}`}
                    />
                  ))}
                </div>
              )}
          </div>
        </div>
      )}
    </>
  );
};
export default ProjectScrollAnimator;
