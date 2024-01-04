import { ListItem, ListItemPrefix } from "@material-tailwind/react";
import { LogoRenderer } from "../util/ComponentsRenderer";

const MenuItems = ({ props }) => {
  return (
    <>
      {props &&
        props.map((itemInfo, index) => {
          if (itemInfo.isActive) {
            return (
              <ListItem key={index} className="hover:bg-blue-gray-300">
                {itemInfo.prefixLogo !== null ? (
                  <ListItemPrefix>
                    {LogoRenderer(itemInfo.prefixLogo)}
                  </ListItemPrefix>
                ) : null}
                {itemInfo.text}
              </ListItem>
            );
          } else {
            return null;
          }
        })}
    </>
  );
};

export default MenuItems;
