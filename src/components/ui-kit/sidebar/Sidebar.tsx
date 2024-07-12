import navList from "@/navList";
import { useAuth } from "@/hooks/context/useAuth";
import Dropdown from "../Dropdown";
import Avatar from "../Avatar";
import Settings from "@/assets/icons/settings.svg?react";
import Bell from "@/assets/icons/bell.svg?react";
import Bars3 from "@/assets/icons/bars-3.svg?react";
import SlideOver from "./SlideOver";
import { useState } from "react";
import ArrowLongRight from "@/assets/icons/arrow-right.svg?react";
import NavLinkItem from "./NavLinkItem";

function Sidebar({ children }: TChildren) {
  const [open, setOpen] = useState(false);
  const { auth } = useAuth();
  const sidebarContent = (
    <aside className="fixed top-0 bottom-0 z-10 flex flex-col h-screen px-6 pb-4 bg-slate-50 dark:bg-slate-700 w-72 shrink-0">
      <div className="flex items-center justify-between h-16">
        <img
          src="https://tailwindui.com/img/logos/mark.svg"
          alt="Your Company"
          className="h-8"
        />
        <button
          type="button"
          className="outline-none "
          onClick={() => setOpen(false)}
        >
          <ArrowLongRight
            className="block w-6 h-6 md:hidden text-slate-700 dark:text-slate-300 "
            aria-hidden="true"
          />
        </button>
      </div>
      <nav className="flex flex-col flex-1 mt-6 mb-3 text-slate-700 dark:text-slate-300">
        <ul className="flex flex-col flex-1 gap-y-7 " role="list">
          <li>
            <ul>
              {navList
                .filter((item) => item.role === auth?.roles)
                .map((item) => (
                  <li key={item.id}>
                    <NavLinkItem item={item} setOpen={setOpen} />
                  </li>
                ))}
            </ul>
          </li>
          <li className="mt-auto">
            <NavLinkItem
              item={{
                name: "تنظیمات",
                href: "/settings",
                icon: Settings,
              }}
              setOpen={setOpen}
            />
          </li>
        </ul>
      </nav>
    </aside>
  );

  return (
    <div className="flex justify-start w-full overflow-x-hidden">
      <SlideOver
        setOpen={setOpen}
        open={open}
        sidebarContent={sidebarContent}
      />

      {/* //TODO:this layout cause vertical scroll even there is not content in it-change to prevent this */}
      <div className="w-full min-h-screen mr-0 md:mr-72 bg-slate-50 dark:bg-slate-700">
        <header className="flex items-center justify-end w-full h-16 pr-5 text-gray-900 border-b-2 border-stale-100 dark:border-slate-700 dark:text-slate-300">
          <Bars3
            className="w-5 h-5 ml-auto cursor-pointer md:hidden"
            onClick={() => setOpen(!open)}
          />
          <Bell
            className="w-5 h-5 cursor-pointer"
            onClick={() => console.log("bell")}
          />
          <div className="flex items-center pr-4 mr-4 border-r-2 border-slate-200 dark:border-slate-700">
            {/* <Avatar src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" /> */}
            <Avatar />
            <Dropdown auth={auth} />
          </div>
        </header>
        <div
          className="min-w-full bg-gray-200 dark:bg-gray-900"
          style={{ minHeight: "calc(100vh - 4rem)" }} //If you add a footer with height h-16 and you don't want it to cause scrolling when there isn't enough content, change 4rem to 8rem
        >
          <main className="container py-10 mx-auto ">
            <div className="px-8 text-gray-900 dark:text-slate-300">
              {children}
            </div>
          </main>
        </div>
        {/* <footer className="w-full h-16 mt-auto text-center text-gray-900 bg-orange-300 dark:text-slate-300">
          HELLO THIS IS FOOTER AND IT WILL BE FIXED WHENEVER is NECESSARY
        </footer> */}
      </div>
    </div>
  );
}

export default Sidebar;
