import Layout from "./layout/Layout";
import "./layout/Globals.css";
// import { lazy } from "react";
// import { Route, Switch } from "react-router-dom";
// import Home from "./pages/Home";
import { componentRenderer } from "./components/util/ComponentsRenderer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { appDataActions } from "./store/appData-Slice";
import { useLocation } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  // const contentData = useSelector((state) => state.profile.contentData);
  const contentData = useSelector((state) => state.profileData.contentData);
  // const PageNotFound = lazy(() => import("./pages/ComponentNotFound"));
  const location = useLocation();

  useEffect(() => {
    if (window.innerWidth <= 550) dispatch(appDataActions.setMobileView());
    else dispatch(appDataActions.setDesktopView());

    const queryParams = new URLSearchParams(window.location.search);
    let paramValue = queryParams.get("id");

    if (paramValue === null || paramValue === undefined) paramValue = 1;

    dispatch(appDataActions.setUser({ user: paramValue }));

    // Alternatively, you can convert all query parameters to an object
    // const queryParamsObject = Object.fromEntries(queryParams.entries());
  }, [dispatch, location.search]);

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
