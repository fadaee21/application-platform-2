import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import Check from "@/assets/icons/check.svg?react";

interface IProps {
  selected: SelectedOption | null;
  setSelected: React.Dispatch<React.SetStateAction<SelectedOption | null>>;
  items: SelectedOption[];
  className?: string;
  label?: string;
  disabled?: boolean;
}

export default function ListBoxSelect({
  items,
  selected,
  setSelected,
  label,
  disabled,
}: IProps) {
  return (
    <>
      <h6 className="ml-2 sm:text-lg text-base font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap ">
        {label}
      </h6>
      <Listbox value={selected} onChange={setSelected} disabled={disabled}>
        <div className="relative mt-1 w-full ml-10">
          <Listbox.Button className="relative w-full py-2 pl-10 pr-3 text-right bg-gray-100 rounded-lg shadow-md cursor-default dark:bg-gray-700 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="absolute inset-y-0 flex items-center pr-2 pointer-events-none left-2">
              <ChevronDown
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
            <span className="block truncate">
              {selected ? selected.label : "-"}
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-gray-100 rounded-md shadow-lg dark:bg-gray-700 max-h-60 ring-1 ring-black/5 focus:outline-none sm:text-sm z-10">
              {items.map((item, i) => (
                <Listbox.Option
                  key={i}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-gray-300 dark:bg-slate-800/30 " : ""
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <Check className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </>
  );
}
