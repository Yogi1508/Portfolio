import {
  Briefcase,
  Building2,
  Code2,
  Facebook,
  FolderGit2,
  GraduationCap,
  Hash,
  Home,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  School2,
  User2,
} from "lucide-react";
import ComponentNotFound from "../../pages/ComponentNotFound";
import MenuItems from "../sidebar/MenuItems";
import DdMenu from "../sidebar/DdMenu";
import HomeComponent from "../../pages/Home";
import About from "../../pages/About";
import Experiences from "../../pages/Experiences";
import Projects from "../../pages/Projects";
import Educations from "../../pages/Educations";
import Skills from "../../pages/Skills";
import Tools from "../../pages/Tools";
import ContactMe from "../../pages/ContactMe";
import Resume from "../../pages/Resume";

export const componentRenderer = (componentName, componentProp, index) => {
  try {
    const menuItemName = componentName.split("_")[0];
    switch (menuItemName) {
      case "MenuItems":
        return <MenuItems key={index} props={componentProp} />;
      case "DdItem":
        return <DdMenu key={index} props={componentProp} />;
      case "Home":
        return <HomeComponent key={index} props={componentProp} />;
      case "About":
        return <About key={index} props={componentProp} />;
      case "Experiences":
        return <Experiences key={index} props={componentProp} />;
      case "Projects":
        return <Projects key={index} props={componentProp} />;
      case "Educations":
        return <Educations key={index} props={componentProp} />;
      case "Skills":
        return <Skills key={index} props={componentProp} />;
      case "Tools":
        return <Tools key={index} props={componentProp} />;
      case "ContactMe":
        return <ContactMe key={index} props={componentProp} />;
      case "Resume":
        return <Resume key={index} props={componentProp} />;
      default:
        return <ComponentNotFound key={index} props={componentProp} />;
    }
  } catch (error) {}
};

export const LogoRenderer = (logoInfo) => {
  try {
    switch (logoInfo.name) {
      case "Home":
        return <Home color={logoInfo.color} className={logoInfo.className} />;
      case "User2":
        return <User2 color={logoInfo.color} className={logoInfo.className} />;
      case "GraduationCap":
        return (
          <GraduationCap
            color={logoInfo.color}
            className={logoInfo.className}
          />
        );
      case "School2":
        return (
          <School2 color={logoInfo.color} className={logoInfo.className} />
        );
      case "Building2":
        return (
          <Building2 color={logoInfo.color} className={logoInfo.className} />
        );
      case "Briefcase":
        return (
          <Briefcase color={logoInfo.color} className={logoInfo.className} />
        );
      case "Hash":
        return <Hash color={logoInfo.color} className={logoInfo.className} />;
      case "Instagram":
        return (
          <Instagram color={logoInfo.color} className={logoInfo.className} />
        );
      case "Linkedin":
        return (
          <Linkedin color={logoInfo.color} className={logoInfo.className} />
        );
      case "Facebook":
        return (
          <Facebook color={logoInfo.color} className={logoInfo.className} />
        );
      case "FolderGit2":
        return (
          <FolderGit2 color={logoInfo.color} className={logoInfo.className} />
        );
      case "Code2":
        return <Code2 color={logoInfo.color} className={logoInfo.className} />;
      case "Phone":
        return <Phone color={logoInfo.color} className={logoInfo.className} />;
      case "Mail":
        return <Mail color={logoInfo.color} className={logoInfo.className} />;
      default:
        return <></>;
    }
  } catch (error) {}
};
