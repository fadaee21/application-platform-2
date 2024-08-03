import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Transition } from "@headlessui/react";

interface NavLinkItemProps {
  item: INavItem;
  setOpen: (open: boolean) => void;
}

const NavLinkItem = ({ item, setOpen }: NavLinkItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const IconComponent = item.icon; // Extract the icon component

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {item.href ? (
        <NavLink
          onClick={() => setOpen(false)}
          to={item.href}
          className={({ isActive }) =>
            `flex p-2 my-1 text-sm font-semibold leading-6 rounded-md gap-x-3 hover:text-slate-900 hover:dark:text-slate-50 ${
              isActive
                ? "bg-gray-300 text-slate-900 dark:text-slate-50 dark:bg-slate-800/30"
                : ""
            }`
          }
          end
        >
          {IconComponent && <IconComponent className="w-5 h-5" />}{" "}
          {/* Render the icon if it exists */}
          {item.name}
        </NavLink>
      ) : (
        <div
          onClick={handleToggle}
          className="flex p-2 my-1 text-sm font-semibold leading-6 rounded-md gap-x-3 cursor-pointer hover:text-slate-900 hover:dark:text-slate-50"
        >
          {IconComponent && <IconComponent className="w-5 h-5" />}{" "}
          {/* Render the icon if it exists */}
          <div className="flex justify-between w-full">
            {item.name}
            <svg
              className={`fill-current transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                fill=""
              />
            </svg>
          </div>
        </div>
      )}
      {item.children && (
        <Transition
          show={isOpen}
          enter="transition-all duration-300"
          enterFrom="max-h-0 opacity-0"
          enterTo="max-h-screen opacity-100"
          leave="transition-all duration-300"
          leaveFrom="max-h-screen opacity-100"
          leaveTo="max-h-0 opacity-0"
        >
          <ul className="pr-8 overflow-hidden">
            {item.children.map((child) => (
              <li key={child.id}>
                <NavLinkItem item={child} setOpen={setOpen} />
              </li>
            ))}
          </ul>
        </Transition>
      )}
    </>
  );
};

export default NavLinkItem;
