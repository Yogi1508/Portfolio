import { useState } from "react";
import { useEffect } from "react";
import classes from "./SkillAnimation.module.css";

const Animation = ({ AnimationList }) => {
  const [translateZ, setTranslateZ] = useState(
    AnimationList === null ? 10 : AnimationList.length
  );

  useEffect(() => {
    if (AnimationList !== null) setTranslateZ(AnimationList.length);
  }, [AnimationList]);

  return (
    <>
      <div className={`${classes.skillAnimationContainer} sm:hidden`}>
        <div className={`${classes.circle}`}>
          <div></div>
          {AnimationList &&
            AnimationList.map((item, index) => {
              return (
                <span
                  key={`span${item.order}_${index}`}
                  className={classes.circleSpan}
                  style={{
                    "--i": item.order,
                    "--translateZ": `calc(var(--i) * (360deg / ${translateZ}))`,
                    transform:
                      "rotateY(var(--translateZ)) translateZ(" +
                      translateZ +
                      "vw)",
                  }}
                >
                  <img
                    key={`img${item.order}_${index}`}
                    className={classes.circleSpanImg}
                    alt={item.altName}
                    src={item.src}
                    height="75px"
                  />
                </span>
              );
            })}
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Animation;
