// import { useSelector } from "react-redux";

const RrTooltipContent = ({ rrData }) => {
  //   const isMobileView = useSelector((state) => state.appData.isMobileView);

  if (!Array.isArray(rrData)) {
    return null; // or handle this case as needed
  }

  return (
    <ul className=" ml-2 list-disc list-outside">
      {rrData.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default RrTooltipContent;
