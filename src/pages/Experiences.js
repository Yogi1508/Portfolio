import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Experience from "../components/experiences/Experience";
import { calcTotalExperience } from "../components/util/Common";

const Experiences = ({ props }) => {
  return (
    <>
      {props && (
        <Card shadow={false} className="bg-blue-gray-900 mt-1">
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="mx-0 flex items-center gap-4 pt-0 pb-8 ml-5 mr-5"
          >
            <div className="text-xl font-medium text-zinc-200 ">
              <strong>
                Experience [
                {calcTotalExperience(
                  props.filter((experience) => experience.isActive)
                )}
                ]
              </strong>
            </div>
          </CardHeader>
          <CardBody className=" mb-2 p-0 ml-2 mr-2 grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-1 sm:grid-cols-1 gap-2">
            {props
              .filter((item) => {
                return item.isActive === true;
              })
              .sort((a, b) => a.order - b.order)
              .map((experience, index) => {
                return (
                  <Experience
                    key={index}
                    experienceInfo={experience}
                    index={index}
                  />
                );
              })}
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default Experiences;
