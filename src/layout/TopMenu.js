import { Button } from "@material-tailwind/react";
import { Menu } from "lucide-react";

const TopMenu = ({ showSideMenu, setShowSideMenu }) => {
  return (
    <>
      <nav className="flex sticky shadow-md top-0 z-10 bg-body p-2 text-info justify-between">
        <div className="flex items-center gap-10"></div>
        <div className="ml-auto space-x-5">
          <Button color="blue-gray">Contact Me</Button>
          <button onClick={() => setShowSideMenu(!showSideMenu)} type="button">
            <Menu className="flex lg:hidden cursor-pointer hover:text-primary transition-colors" />
          </button>
        </div>
      </nav>
    </>
  );
};

export default TopMenu;
