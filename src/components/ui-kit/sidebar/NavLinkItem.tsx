import { NavLink } from "react-router-dom";

interface NavLinkItemProps {
  item: {
    href: string;
    name: string;
    icon: React.FunctionComponent<
      React.SVGProps<SVGSVGElement> & {
        title?: string | undefined;
      }
    >;
  };
  setOpen: (open: boolean) => void;
}

const NavLinkItem = ({ item, setOpen }: NavLinkItemProps) => {
  const IconComponent = item.icon; // Extract the icon component

  return (
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
      <IconComponent className="w-5 h-5" /> {/* Render the icon */}
      {item.name}
    </NavLink>
  );
};

export default NavLinkItem;
