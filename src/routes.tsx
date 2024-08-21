import { createBrowserRouter } from "react-router-dom";
import RequireAuth from "@components/auth/RequireAuth";
import PersistLogin from "@components/auth/PersistLogin";
import RootLayout from "@components/layout/RootLayout";

import DashboardPage from "@pages/dashboard/DashboardPage";
import LoginPage from "@pages/login/LoginPage";
import RegisteredAccount from "@pages/registered-account/RegisteredAccount";
import ProjectsPage from "@pages/projects/ProjectsPage";
import SettingPage from "@pages/setting/SettingPage";
import NotFoundPage from "@pages/not-found/NotFoundPage";
import Transactions from "./pages/registered-account/Transactions";
import AppSettings from "./pages/app-settings/AppSettings";
import Banner from "./pages/banner/Banner";
import BannerId from "./pages/banner/BannerId";
import CreateBanner from "./pages/banner/CreateBanner";
import Test from "./pages/test";
import { Address } from "./pages/registered-account/Address";
import Product from "./pages/product/product/Products";
import Tags from "./pages/product/Tags";
import Categories from "./pages/product/category/Categories";
import Stock from "./pages/product/Stock";
import Additions from "./pages/product/additions/Additions";
import AdditionsStock from "./pages/product/AdditionsStock";
import AddCategory from "./pages/product/category/AddCategory";
import AddProducts from "./pages/product/product/AddProducts";
import AddAdditions from "./pages/product/additions/AddAdditions";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    // loader: protectedLoader,
    element: <PersistLogin />,
    children: [
      {
        element: <RootLayout />,
        children: [
          {
            path: "superuser",
            element: <RequireAuth allowedRoles={["SUPERUSER"]} />,
            children: [
              {
                index: true,
                element: <DashboardPage />,
              },
              {
                path: "registered-account",

                children: [
                  {
                    index: true,
                    element: <RegisteredAccount />,
                  },
                  {
                    path: "transactions/:id",
                    element: <Transactions />,
                  },
                  {
                    path: "address/:accountId",
                    element: <Address />,
                  },
                ],
              },

              {
                path: "app-settings",
                element: <AppSettings />,
              },
              {
                path: "banners",
                children: [
                  {
                    index: true,
                    element: <Banner />,
                  },
                  {
                    path: ":id",
                    element: <BannerId />,
                  },
                  {
                    path: "new",
                    element: <CreateBanner />,
                  },
                ],
              },
              {
                path: "product",
                children: [
                  {
                    path: "",
                    children: [
                      {
                        index: true,
                        element: <Product />,
                      },
                      {
                        path: "add",
                        element: <AddProducts />,
                      },
                    ],
                  },
                  {
                    path: "tags",
                    element: <Tags />,
                  },
                  {
                    path: "categories",
                    children: [
                      {
                        index: true,
                        element: <Categories />,
                      },
                      {
                        path: "add",
                        element: <AddCategory />,
                      },
                    ],
                  },
                  {
                    path: "stock",
                    element: <Stock />,
                  },
                  {
                    path: "additions",
                    children: [
                      {
                        index: true,
                        element: <Additions />,
                      },
                      {
                        index: true,
                        element: <Additions />,
                      },
                      {
                        path: "add",
                        element: <AddAdditions />,
                      },
                    ],
                  },
                  {
                    path: "additions-stock",
                    element: <AdditionsStock />,
                  },
                ],
              },
            ],
          },
          {
            path: "user",
            element: <RequireAuth allowedRoles={["USER"]} />,
            children: [
              {
                index: true,
                element: <ProjectsPage />,
              },
            ],
          },
          {
            path: "settings",
            element: <RequireAuth allowedRoles={["SUPERUSER", "USER"]} />, //add all allowed roles
            children: [
              {
                index: true,
                element: <SettingPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: true,
    // loader: loginLoader,
    element: <LoginPage />,
  },
  {
    path: "test",
    element: <Test />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;

// function protectedLoader({ request }: LoaderFunctionArgs) {
//   const token = Cookies.get("refreshToken");
//   if (!token) {
//     const params = new URLSearchParams();
//     params.set("from", new URL(request.url).pathname);
//     return redirect("/?" + params.toString());
//   }
//   return null;
// }
