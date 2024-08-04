import Dashboard from "@/assets/icons/dashboard.svg?react";
import Team from "@/assets/icons/team.svg?react";
import Adjustment from "@/assets/icons/adjustments-horizontal.svg?react";
import Photo from "@/assets/icons/photo.svg?react";
import ShoppingBag from "@/assets/icons/shopping-bag.svg?react";
// import Projects from "@/assets/icons/projects.svg?react";
// import Calendar from "@/assets/icons/calendar.svg?react";
// import Document from "@/assets/icons/document.svg?react";
// import Reports from "@/assets/icons/reports.svg?react";

// 1:SUPERUSER
// 2:user
const navList: INavItem[] = [
  {
    id: "1a",
    name: "داشبورد",
    href: "/superuser",
    index: true,
    icon: Dashboard,
    role: "SUPERUSER",
  },
  {
    id: "5a",
    name: "محصول ها",
    icon: ShoppingBag,
    role: "SUPERUSER",
    children: [
      {
        id: "5a-1",
        name: "محصول ها",
        href: "superuser/product",
        role: "SUPERUSER",
      },
      {
        id: "5a-2",
        name: "برچسب ها",
        href: "superuser/product/tags",
        role: "SUPERUSER",
      },
      {
        id: "5a-3",
        name: "دسته بندی ها",
        href: "superuser/product/categories",
        role: "SUPERUSER",
      },
      {
        id: "5a-4",
        name: "موجودی محصول ها",
        href: "superuser/product/stock",
        role: "SUPERUSER",
      },
      {
        id: "5a-5",
        name: "افزودنی ها",
        href: "superuser/product/additions",
        role: "SUPERUSER",
      },
      {
        id: "5a-6",
        name: "موجودی افزودنی ها",
        href: "superuser/product/additions-stock",
        role: "SUPERUSER",
      },
    ],
  },
  {
    id: "2a",
    name: "کاربران",
    href: "/superuser/registered-account",
    icon: Team,
    role: "SUPERUSER",
  },
  {
    id: "3a",
    name: "بنر",
    href: "/superuser/banners",
    icon: Photo,
    role: "SUPERUSER",
  },
  {
    id: "4a",
    name: "تنظیمات اپلیکیشن",
    href: "/superuser/app-settings",
    icon: Adjustment,
    role: "SUPERUSER",
  },

  {
    id: "1u",
    name: "تست-پروژه",
    href: "/user",
    index: true,
    icon: Dashboard,
    role: "USER",
  },
];

export default navList;
