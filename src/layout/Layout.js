import SidebarMenu from "./SidebarMenu";
import { useState } from "react";
// import TopMenu from "./TopMenu";
import Footer from "./Footer";
import { useEffect } from "react";
import { Menu } from "lucide-react";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import ContactMe from "../pages/ContactMe";

const Layout = (props) => {
  const sideBarData = useSelector((state) => state.profileData.sideBarData);
  const [showSideMenu, setShowSideMenu] = useState(true);

  useEffect(() => {
    toast.success(
      "Thank you for visiting. I look forward to hearing from you soon."
    );
    const handleResize = () => {
      if (window.innerWidth > 960) {
        setShowSideMenu(true);
      } else {
        setShowSideMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Toaster />

      <div className="flex">
        {sideBarData && (
          <SidebarMenu
            showSideMenu={showSideMenu}
            setShowSideMenu={setShowSideMenu}
            sideBarData={sideBarData}
          />
        )}

        <main className="flex-1 pl-0 h-screen ..." style={{ overflow: "auto" }}>
          <ContactMe />
          <button
            onClick={() => setShowSideMenu(!showSideMenu)}
            id="testButton"
            type="button"
          >
            <Menu className="flex lg:hidden cursor-pointer hover:text-primary transition-colors" />
          </button>
          <div className=" mt-0 mr-2">{props.children}</div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
