import Layout from "./layout/Layout";
import "./layout/Globals.css";
// import { lazy } from "react";
// import { Route, Switch } from "react-router-dom";
// import Home from "./pages/Home";
import { componentRenderer } from "./components/util/ComponentsRenderer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { appDataActions } from "./store/appData-Slice";

function App() {
  const dispatch = useDispatch();
  // const contentData = useSelector((state) => state.profile.contentData);
  const contentData = useSelector((state) => state.profileData.contentData);
  // const PageNotFound = lazy(() => import("./pages/ComponentNotFound"));

  useEffect(() => {
    if (window.innerWidth <= 550) dispatch(appDataActions.setMobileView());
    else dispatch(appDataActions.setDesktopView());
  }, [dispatch]);

  return (
    <>
      <Layout>
        {contentData &&
          contentData.BodyContent.map((componentName, index) => {
            const componentItems = contentData[componentName] || [];
            return (
              <div key={index}>
                {componentRenderer(componentName, componentItems, index)}
              </div>
            );
          })}
        <br></br>
      </Layout>
    </>
  );
}

export default App;
