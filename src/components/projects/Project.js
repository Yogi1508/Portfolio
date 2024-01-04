import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { IsEmptyOrNull } from "../util/Common";

const Project = ({ projectInfo }) => {
  // const isMobileView = useSelector((state) => state.appData.isMobileView);
  const contentData = useSelector((state) => state.profileData.contentData);
  const [isExpandJobProfile, setIsExpandJobProfile] = useState(false);
  const [association, setAssociation] = useState();
  const [associationType, setAssociationType] = useState(null);

  useEffect(() => {
    let associationObj = null;
    associationObj = contentData.Experiences.find(
      (exp) => exp.associationId === projectInfo.associationId
    );
    setAssociationType("Experience");

    if (associationObj === null && associationObj === undefined) {
      associationObj = contentData.Educations.find(
        (edj) => edj.associationId === projectInfo.associationId
      );
      setAssociationType("Education");
    }

    if (associationObj !== null && associationObj !== undefined)
      setAssociation(associationObj);
  }, [
    contentData.Educations,
    contentData.Experiences,
    projectInfo.associationId,
  ]);

  return (
    <>
      {projectInfo && contentData && (
        <Card shadow={false} className={`lex-1 w-full bg-blue-gray-800`}>
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="mx-0 flex items-center text-primary ml-2 mr-2"
          >
            <div className="display-flex flex-row justify-space-between w-full">
              <div className="flex items-center justify-between">
                <div className="font-bold items-start">
                  {!IsEmptyOrNull(projectInfo.url) ? (
                    <a
                      className="optional-action-target-wrapper display-flex text-blue-700"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={projectInfo.url}
                    >
                      <span aria-hidden="true">{projectInfo.name}</span>
                    </a>
                  ) : (
                    <span aria-hidden="true">{projectInfo.name}</span>
                  )}{" "}
                  [{projectInfo.status}]
                </div>
                <div className="text-sm font-normal text-gray-500 items-end">
                  <span aria-hidden="true">
                    {projectInfo.startDate} - {projectInfo.endDate}
                  </span>
                </div>
              </div>
              {!IsEmptyOrNull(associationType) &&
              !IsEmptyOrNull(association) ? (
                <div className="flex items-center justify-between">
                  <div className="items-start">
                    <span aria-hidden="true">
                      {associationType === "Experience"
                        ? association.companyName
                        : association.instituteName}
                    </span>
                  </div>
                  {/* <div className="text-sm font-normal text-gray-500 items-end">
                    <span className="text-sm font-normal text-gray-500">
                      <span aria-hidden="true">
                        Work Location Location Type
                      </span>
                    </span>
                  </div> */}
                </div>
              ) : (
                <></>
              )}
            </div>
          </CardHeader>
          <CardBody className="flex mb-4 p-0 ml-1 mr-1">
            <div className="flex flex-wrap">
              <div className={`p-2`}>
                {projectInfo.description && (
                  <>
                    <p className={isExpandJobProfile ? "" : "line-clamp-2"}>
                      {projectInfo.description}
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
              {projectInfo.skillsUsed.length > 0 && (
                <div className="w-full">
                  <p>Skills Used: [{projectInfo.skillsUsed.join(", ")}]</p>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default Project;
