import { useEffect } from "react";
import { useState } from "react";
import TechCard from "../components/ui/TechCard";

const Tools = ({ props }) => {
  const [groupedToolsArray, setGroupedToolsArray] = useState(null);

  useEffect(() => {
    try {
      if (props !== null && props !== undefined) {
        if (props.length > 0) {
          // Grouping by "type" property
          const groupedTools = props.reduce((result, item) => {
            const key = item.type || "Other"; // If "type" is falsy, use "Other" as the key
            (result[key] = result[key] || []).push(item);
            return result;
          }, {});

          if (groupedTools !== null && groupedTools !== undefined) {
            const groupedToolList = Object.entries(groupedTools).map(
              ([title, itemList]) => ({
                title,
                itemList,
              })
            );

            if (groupedToolList !== null && groupedToolList !== undefined) {
              setGroupedToolsArray(groupedToolList);
            }
          }
        }
      }
    } catch (err) {
      // console.log(err);
      setGroupedToolsArray(null);
    }
  }, [props]);
  return (
    <>
      {groupedToolsArray && (
        <div className="col-span-2 p-2 md:col-span-2 lg:col-span-3">
          <div className="text-xl font-medium mt-2 text-zinc-200 mb-5">
            Tools I know
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {groupedToolsArray.map((obj, index) => {
              return (
                <TechCard
                  key={index}
                  title={obj.title}
                  itemList={obj.itemList}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Tools;
