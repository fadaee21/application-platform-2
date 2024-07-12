import Dashboard from "@/assets/icons/dashboard.svg?react";
import Team from "@/assets/icons/team.svg?react";
import Adjustment from "@/assets/icons/adjustments-horizontal.svg?react";
import Photo from "@/assets/icons/photo.svg?react";
// import Projects from "@/assets/icons/projects.svg?react";
// import Calendar from "@/assets/icons/calendar.svg?react";
// import Document from "@/assets/icons/document.svg?react";
// import Reports from "@/assets/icons/reports.svg?react";

// 1:SUPERUSER
// 2:user
const navList = [
  {
    id: "1a",
    name: "داشبورد",
    href: "/superuser",
    index: true,
    icon: Dashboard,
    role: "SUPERUSER",
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
  // {
  //   id: "3a",
  //   name: "پروژه‌ها",
  //   href: "/superuser/projects",
  //   icon: Projects,
  //   role: "SUPERUSER",
  // },
  //   {
  //     id: 4,
  //     name: "تقویم",
  //     href: "/SUPERUSER/calendar",
  //     icon: Calendar,
  //   },
  //   {
  //     id: 5,
  //     name: "گزارش‌ها",
  //     href: "/SUPERUSER/report",
  //     icon: Reports,
  //   },
  //   {
  //     id: 6,
  //     name: "اسناد",
  //     href: "/SUPERUSER/document",
  //     icon: Document,
  //   },
];

export default navList;
