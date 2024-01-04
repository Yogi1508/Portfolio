import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Typography,
  CardFooter,
} from "@material-tailwind/react";
import { CalcExp, IsEmptyOrNull } from "../util/Common";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import ProjectScrollAnimator from "../projects/ProjectScrollAnimator";

const Education = ({ educationInfo }) => {
  const isMobileView = useSelector((state) => state.appData.isMobileView);
  const contentData = useSelector((state) => state.profileData.contentData);
  const [isShowProjects, setIsShowProjects] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const projectList = contentData["Projects"] || [];
    if (!IsEmptyOrNull(projectList) && !IsEmptyOrNull(educationInfo)) {
      setProjects(
        projectList
          .filter((item) => {
            return (
              item.isActive === true &&
              item.associationId === educationInfo.associationId
            );
          })
          .sort((a, b) => a.order - b.order)
      );
    }
  }, [contentData, educationInfo, educationInfo.associationId]);

  return (
    educationInfo && (
      <Card
        shadow={false}
        className={`flex-1 bg-blue-gray-800 ${
          isShowProjects ? "col-span-2" : ""
        }`}
      >
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="mx-0 flex items-center text-primary ml-2 mr-2"
        >
          <a
            className="optional-action-target-wrapper display-flex"
            target="_blank"
            rel="noopener noreferrer"
            href={
              IsEmptyOrNull(educationInfo.instituteUrl)
                ? "#top"
                : educationInfo.instituteUrl
            }
          >
            <img
              width="48"
              src={educationInfo.instituteLogo}
              loading="lazy"
              height="48"
              alt={educationInfo.instituteName}
            />
          </a>
          <div className="display-flex flex-column full-width w-full align-self-center ml-2">
            <div className="display-flex flex-row justify-space-between">
              <div className="display-flex flex-column full-width">
                <div className="flex items-center justify-between">
                  <div className="font-bold items-start">
                    <span aria-hidden="true">
                      {educationInfo.course} [{educationInfo.grades}]
                    </span>
                  </div>
                  <div className="text-sm font-normal text-gray-500 items-end">
                    <span aria-hidden="true">
                      {educationInfo.startDate} - {educationInfo.endDate} ·{" "}
                      {CalcExp(educationInfo.startDate, educationInfo.endDate)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="items-start">
                    <span aria-hidden="true">
                      {educationInfo.instituteName}
                    </span>
                  </div>
                  <div className="text-sm font-normal text-gray-500 items-end">
                    <span className="text-sm font-normal text-gray-500">
                      <span aria-hidden="true">
                        {educationInfo.instituteAddress}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className="flex mb-6 p-0 ml-4 mr-4">
          {projects.length > 0 && (
            <div className="flex flex-wrap">
              <div className="w-1/4">
                <Button
                  variant="text"
                  className="flex items-center gap-2 text-white rounded-full bg-blue-gray-500"
                  // className="flex items-center gap-3 bg-transparent text-orange-400 rounded-full"
                  onClick={() => setIsShowProjects(!isShowProjects)}
                >
                  {isShowProjects ? "Hide Projects" : "Projects"}
                </Button>
              </div>
            </div>
          )}
        </CardBody>
        {isShowProjects && (
          <CardFooter>
            <div className=" w-auto">
              <Card shadow={false} className="bg-blue-gray-900 mt-1 ml-1">
                <CardBody className="p-0 ml-1 mr-1">
                  <Typography className=" ml-4" variant="h4" color="white">
                    Projects
                  </Typography>
                  <ProjectScrollAnimator projects={projects} />
                </CardBody>
              </Card>
            </div>
          </CardFooter>
        )}
      </Card>
    )
  );
};

export default Education;
