import { Fragment } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import Check from "@/assets/icons/check.svg?react";
import clsx from "clsx";

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
  const renderItem = (item: SelectedOption) => (
    <ListboxOption
      key={item.value}
      value={item}
      className={({ active }) =>
        `relative cursor-default select-none py-2 pl-10 pr-4 ${
          active ? "bg-gray-300 dark:bg-slate-800/30 " : ""
        }`
      }
    >
      {({ selected }) => (
        <div className="flex items-center">
          <span
            className={clsx(
              " flex justify-between w-full",
              selected ? "font-semibold" : "font-normal"
            )}
          >
            {item.label}
            <Check
              className={clsx("size-5 text-gray-400", !selected && "invisible")}
            />
          </span>
        </div>
      )}
    </ListboxOption>
  );

  return (
    <>
      <Listbox value={selected} onChange={setSelected} disabled={disabled}>
        {label && (
          <Label className="ml-2 sm:text-md text-base  text-slate-700 dark:text-slate-300 whitespace-nowrap">
            {label}
          </Label>
        )}

        <div className="relative mt-1 w-full ml-10">
          <ListboxButton className="relative w-full py-2 pl-10 pr-3 text-right bg-gray-100 rounded-lg shadow-md cursor-default dark:bg-gray-700 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="absolute inset-y-0 flex items-center pr-2 pointer-events-none left-2">
              <ChevronDown
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
            <span className="block truncate">
              {selected ? selected.label : "-"}
            </span>
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute w-full py-1 mt-1 overflow-auto text-base bg-gray-100 rounded-md shadow-lg dark:bg-gray-700 max-h-60 ring-1 ring-black/5 focus:outline-none sm:text-sm z-10">
              {items.map(renderItem)}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </>
  );
}
