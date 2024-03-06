import { useEffect, useState } from "react";
import TechCard from "../components/ui/TechCard";

const Skills = ({ props }) => {
  const [groupedSkillsArray, setGroupedSkillsArray] = useState(null);

  useEffect(() => {
    try {
      if (props !== null && props !== undefined) {
        if (props.length > 0) {
          // Grouping by "type" property
          const groupedSkills = props.reduce((result, item) => {
            const key = item.type || "Other"; // If "type" is falsy, use "Other" as the key
            (result[key] = result[key] || []).push(item);
            return result;
          }, {});

          if (groupedSkills !== null && groupedSkills !== undefined) {
            const groupedSkillList = Object.entries(groupedSkills).map(
              ([title, itemList]) => ({
                title,
                itemList,
              })
            );

            if (groupedSkillList !== null && groupedSkillList !== undefined) {
              setGroupedSkillsArray(groupedSkillList);
            }
          }
        }
      }
    } catch (err) {
      // console.log(err);
      setGroupedSkillsArray(null);
    }
  }, [props]);

  return (
    <>
      {groupedSkillsArray && (
        <div className="col-span-2 p-2 md:col-span-2 lg:col-span-3">
          <div className="text-xl font-medium mt-2 text-zinc-200 mb-5">
            Tech I know
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {groupedSkillsArray.map((obj, index) => {
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

export default Skills;
