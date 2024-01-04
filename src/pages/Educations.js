import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import Education from "../components/educations/Education";

const Educations = ({ props }) => {
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
              <strong>Education</strong>
            </div>
          </CardHeader>
          <CardBody className=" mb-2 p-0 ml-2 mr-2 grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-1 sm:grid-cols-1 gap-2">
            {props
              .filter((item) => {
                return item.isActive === true;
              })
              .sort((a, b) => a.order - b.order)
              .map((education, index) => {
                return (
                  <Education
                    key={index}
                    educationInfo={education}
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

export default Educations;
