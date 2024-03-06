import ProjectScrollAnimator from "../components/projects/ProjectScrollAnimator";
import { Card, CardBody } from "@material-tailwind/react";
import { useEffect, useState } from "react";

const Projects = ({ props }) => {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    setProjects(
      props
        .filter((item) => {
          return item.isActive === true;
        })
        .sort((a, b) => a.order - b.order)
    );
  }, [props]);

  return (
    <>
      {projects && (
        <Card shadow={false} className="w-full bg-blue-gray-900 mt-1 ml-1">
          <CardBody className="p-0 ml-5 mr-1">
            <div className="text-xl font-medium text-zinc-200 ">
              <strong>Projects</strong>
            </div>
            <ProjectScrollAnimator projects={projects} />
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default Projects;
