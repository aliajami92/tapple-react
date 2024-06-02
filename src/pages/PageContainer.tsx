import { Outlet } from "react-router-dom";

const PageContainer = () => {
  return (
    <div className="main-container">
      <h1>TAPPLE</h1>
      <Outlet />
    </div>
  );
};

export default PageContainer;
