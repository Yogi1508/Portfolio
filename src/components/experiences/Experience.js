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
import RrTooltip from "./RrTooltip";
import { useSelector } from "react-redux";
import ProjectScrollAnimator from "../projects/ProjectScrollAnimator";

const Experience = ({ experienceInfo }) => {
  const isMobileView = useSelector((state) => state.appData.isMobileView);
  const contentData = useSelector((state) => state.profileData.contentData);
  const [isExpandJobProfile, setIsExpandJobProfile] = useState(false);
  const [isShowProjects, setIsShowProjects] = useState(false);
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    const projectList = contentData["Projects"] || [];
    if (projectList.length > 0) {
      setProjects(
        projectList
          .filter((item) => {
            return (
              item.isActive === true &&
              item.associationId === experienceInfo.associationId
            );
          })
          .sort((a, b) => a.order - b.order)
      );
    }
  }, [contentData, experienceInfo.associationId]);

  return (
    experienceInfo && (
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
              IsEmptyOrNull(experienceInfo.companyUrl)
                ? "#top"
                : experienceInfo.companyUrl
            }
          >
            <img
              width="48"
              src={experienceInfo.companyLogo}
              loading="lazy"
              height="48"
              alt={experienceInfo.companyName}
            />
          </a>
          <div className="display-flex flex-column full-width w-full align-self-center ml-2">
            <div className="display-flex flex-row justify-space-between">
              <div className="display-flex flex-column full-width">
                <div className="flex items-center justify-between">
                  <div className="font-bold items-start">
                    <span aria-hidden="true">{experienceInfo.designation}</span>
                  </div>
                  <div className="text-sm font-normal text-gray-500 items-end">
                    <span aria-hidden="true">
                      {experienceInfo.startDate} - {experienceInfo.endDate} ·{" "}
                      {CalcExp(
                        experienceInfo.startDate,
                        experienceInfo.endDate
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="items-start">
                    <span aria-hidden="true">
                      {experienceInfo.companyName} · {experienceInfo.workMode}
                    </span>
                  </div>
                  <div className="text-sm font-normal text-gray-500 items-end">
                    <span className="text-sm font-normal text-gray-500">
                      <span aria-hidden="true">
                        {experienceInfo.workLocation} ·{" "}
                        {experienceInfo.locationType}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className="flex mb-6 p-0 ml-4 mr-4">
          <div className="flex flex-wrap">
            <div className={`${isMobileView ? "w-2/4" : "w-3/4"}  p-0`}>
              {experienceInfo.jobProfile.length > 0 && (
                <>
                  <p className={isExpandJobProfile ? "" : "line-clamp-2"}>
                    {experienceInfo.jobProfile}
                  </p>
                  <button
                    className="text-blue-600 hover:underline focus:outline-none"
                    onClick={() => setIsExpandJobProfile(!isExpandJobProfile)}
                  >
                    {isExpandJobProfile ? "Show Less" : "Read More"}
                  </button>
                </>
              )}
            </div>
            <div className="w-1/4">
              <RrTooltip data={experienceInfo.rr} />

              <Button
                variant="text"
                className="flex items-center gap-2 text-white rounded-full bg-blue-gray-500"
                // className="flex items-center gap-3 bg-transparent text-orange-400 rounded-full"
                onClick={() => setIsShowProjects(!isShowProjects)}
              >
                {isShowProjects ? "Hide Projects" : "Projects"}
              </Button>
            </div>
            {experienceInfo.skillsUsed.length > 0 && (
              <div className="w-full">
                <p>Skills: {experienceInfo.skillsUsed.join(", ")}</p>
              </div>
            )}
          </div>
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

export default Experience;
