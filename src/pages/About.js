import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { useEffect } from "react";
import { useState } from "react";
import Typewriter from "typewriter-effect";

const About = ({ props }) => {
  const [header, setHeader] = useState();
  const [body, setBody] = useState();

  useEffect(() => {
    if (props !== null) {
      if (props.Header !== null) setHeader(props.Header);

      if (props.Body !== null) setBody(props.Body);
    }
  }, [props]);

  return (
    <>
      {props && (
        <Card shadow={false} className="w-full bg-blue-gray-900 mt-1 mr-20">
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="mx-0 flex items-center gap-4 pt-0 pb-8 ml-5 mr-5"
          >
            <div className="text-xl font-medium text-zinc-200 ">
              <strong>About</strong>
            </div>
          </CardHeader>
          <CardBody className="mb-6 p-0 ml-4 mr-4">
            {header && (
              //   <Typography color="white">
              <Typewriter
                options={{
                  strings: header.headerText,
                  autoStart: true,
                  loop: header.loop,
                  pauseFor: header.pauseTime,
                  delay: body.typeDelay,
                  deleteSpeed: header.deleteSpeed,
                }}
              />
              //   </Typography>
            )}
            {/* <Typography> */}
            {body && (
              <Typewriter
                options={{
                  strings: body.bodyText,
                  autoStart: true,
                  loop: body.loop,
                  delay: body.typeDelay,
                  pauseFor: body.pauseTime,
                  deleteSpeed: body.deleteSpeed,
                }}
              />
            )}
            {/* </Typography> */}
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default About;
