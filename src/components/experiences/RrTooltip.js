import { Tooltip } from "@material-tailwind/react";
import RrTooltipContent from "./RrTooltipContent";
import Classes from "./RrTooltip.module.css";
import { useState } from "react";

const RrTooltip = ({ data }) => {
  const [showTooTip, setShowToolTip] = useState(false);

  return (
    <Tooltip
      content={<RrTooltipContent rrData={data} />}
      placement="left-start"
      className={`${Classes.glassEffect} w-44 h-52 sm:w-72 md:w-72 `}
      open={showTooTip}
      onMouseLeave={() => {
        setShowToolTip(false);
      }}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 },
      }}
    >
      <button
        className="text-blue-600 hover:underline focus:outline-none"
        onClick={() => {
          setShowToolTip(!showTooTip);
        }}
        // onMouseEnter={() => {
        //   setShowToolTip(true);
        // }}
      >
        Roles & Responsibilities
      </button>
    </Tooltip>
  );
};

export default RrTooltip;
