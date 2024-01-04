import {
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Typography,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { LogoRenderer } from "../util/ComponentsRenderer";

const DdMenu = ({ props }) => {
  const [open, setOpen] = useState(0);

  useEffect(() => {
    setOpen(0);
  }, [props]);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <>
      {props && (
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={3.0}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0 " selected={open === 1}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="border-b-0 p-3  rounded-sm hover:bg-blue-gray-300 focus:bg-blue-200"
            >
              {props[0].prefixLogo !== null ? (
                <ListItemPrefix>
                  {LogoRenderer(props[0].prefixLogo)}
                </ListItemPrefix>
              ) : null}

              <Typography color="white" className="mr-auto font-normal w-2">
                {props[0].text}
              </Typography>
              {props[0].isShowItemCount && (
                <ListItemSuffix>
                  <Chip
                    value={
                      props.filter((item) => {
                        return item.isActive === true;
                      }).length
                    }
                    size="sm"
                    variant="outlined"
                    color="amber"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              )}
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              {props
                .slice(1)
                .filter((item) => {
                  return item.isActive === true;
                })
                .sort((a, b) => a.order - b.order)
                .map((item) => {
                  // Removed index
                  return (
                    <ListItem key={item.text}>
                      {" "}
                      {item.prefixLogo !== null ? (
                        <ListItemPrefix>
                          {LogoRenderer(item.prefixLogo)}
                        </ListItemPrefix>
                      ) : null}
                      {item.isNavLink ? (
                        <div>
                          <p className="mb-2">{item.text}</p>
                          {item.subtext.length > 0 && (
                            <p className="text-xs">{item.subtext}</p>
                          )}
                        </div>
                      ) : (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div>
                            <p className="mb-2">{item.text}</p>
                            {item.subtext.length > 0 && (
                              <p className="text-xs">{item.subtext}</p>
                            )}
                          </div>
                        </a>
                      )}
                    </ListItem>
                  );
                })}
            </List>
          </AccordionBody>
        </Accordion>
      )}
    </>
  );
};

export default DdMenu;
