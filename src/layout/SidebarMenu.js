import { Card, List } from "@material-tailwind/react";
import { componentRenderer } from "../components/util/ComponentsRenderer";
import { X } from "lucide-react";

const SidebarMenu = ({ showSideMenu, setShowSideMenu, sideBarData }) => {
  return (
    <>
      {sideBarData.components.length > 0 && (
        <aside
          className={`${
            showSideMenu ? "flex" : "hidden"
          } h-screen w-screen sm:w-[300px] z-10`}
        >
          <Card className="lg:flex h-[calc(100vh-1.5rem)] w-full max-w-[17rem] p-4 rounded-lg shadow-xl shadow-black-gray-500/5  mr-3 mt-3 mx-3 bg-gray-800 overflow-y-auto overflow-x-hidden">
            <div className="block lg:hidden md:hidden xl:hidden p-5 z-10 text-primary absolute right-0 top-0 cursor-pointer text-2xl">
              <X
                className={`text-primary`}
                onClick={() => {
                  setShowSideMenu(!showSideMenu);
                }}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 w-full max-w-[30rem]">
              <div className="container h-screen">
                {sideBarData && (
                  <List className="grid items-top ...">
                    {sideBarData.components.map((componentName, index) => {
                      const componentItems =
                        sideBarData.ItemDetails[componentName] || [];
                      return (
                        <div key={index}>
                          {componentRenderer(
                            componentName,
                            componentItems,
                            index
                          )}
                        </div>
                      );
                    })}
                  </List>
                )}
              </div>
            </div>
          </Card>
        </aside>
      )}
    </>
  );
};

export default SidebarMenu;
