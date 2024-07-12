import { Outlet } from "react-router-dom";
import Sidebar from "../ui-kit/sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
function RootLayout() {
  return (
    <Sidebar>
      <Outlet />
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        rtl
        className={"sm:w-96 w-full "} //TODO:change the style for different theme
      />
    </Sidebar>
  );
}

export default RootLayout;
