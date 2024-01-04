import { useState } from "react";
import ProfileDetail from "../components/home/ProfileDetail";
import ProfilePic from "../components/home/ProfilePic";
import Animation from "../components/home/Animation";
import { useEffect } from "react";

const Home = ({ props }) => {
  const [showStillAnimation, setShowSkillAnimation] = useState(true);
  const [animationList, setAnimationList] = useState(null);

  useEffect(() => {
    const getActiveAndAnimatedItems = (list) => {
      return Array.from(
        new Set(
          list
            .filter((item) => item.isActive && item.isShowAnimation)
            .map((item, index) => {
              const newItem = { ...item, order: index + 1 };
              return JSON.stringify(newItem);
            })
        )
      ).map((stringifiedItem) => JSON.parse(stringifiedItem));
    };
    setAnimationList(getActiveAndAnimatedItems(props.AnimationList));
  }, [props]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1400) {
        setShowSkillAnimation(true);
      } else {
        setShowSkillAnimation(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div
        className={`flex rounded-lg  bg-[url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-no-repeat bg-cover`}
      >
        <div className="flex justify-start md:rounded-ld overflow-hidden md:px-2 py-5 bg-blur backdrop-filter backdrop-blur-md w-full gap-2 md:gap-2">
          <ProfilePic profileData={props.Profile} />
          <div className="flex justify-between items-center gap-5">
            <ProfileDetail
              profileData={props.Profile}
              socialLink={props.SocialLink}
            />
          </div>
          {showStillAnimation && (
            <div className=" flex-1 justify-between items-center gap-5">
              <Animation AnimationList={animationList} />
            </div>
          )}
        </div>
      </div>
      {/* 
      <SkillAnimation /> */}
    </>
  );
};

export default Home;
