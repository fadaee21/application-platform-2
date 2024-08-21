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
import XMark from "@/assets/icons/x-mark.svg?react";
import clsx from "clsx";

interface IProps {
  selected: SelectedOption[] | null;
  setSelected: React.Dispatch<React.SetStateAction<SelectedOption[] | null>>;
  items: SelectedOption[];
  className?: string;
  label?: string;
  disabled?: boolean;
}

export default function ListBoxSelectMultiple({
  items,
  selected,
  setSelected,
  label,
  disabled,
}: IProps) {
  const handleRemove = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    person: SelectedOption
  ) => {
    e.stopPropagation();
    if (!selected) return;
    setSelected(selected.filter((item) => item !== person));
  };

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
              "flex justify-between w-full cursor-pointer",
              selected ? "font-semibold" : "font-normal"
            )}
          >
            {item.label}
            <Check
              className={clsx(
                "size-5 text-red-400 visible ",
                !selected && "invisible"
              )}
            />
          </span>
        </div>
      )}
    </ListboxOption>
  );

  const handleMultiSelect = (selectedOptions: SelectedOption[]) => {
    if (!selected) {
      setSelected(selectedOptions);
      return;
    }
    const newArray = [...selected];
    selectedOptions.forEach((selectedOpt) => {
      const isExist = newArray.some(
        (newOpt) => newOpt.value === selectedOpt.value
      );
      if (isExist) {
        setSelected(
          newArray.filter((newOpt) => newOpt.value !== selectedOpt.value)
        );
        return;
      }
      setSelected(selectedOptions);
    });
  };

  return (
    <>
      <Listbox
        value={selected}
        onChange={handleMultiSelect}
        disabled={disabled}
        multiple
      >
        {label && (
          <Label className="ml-2 sm:text-md text-base  text-slate-700 dark:text-slate-300 whitespace-nowrap">
            {label}
          </Label>
        )}

        <div className="relative mt-1 w-full ml-10">
          <ListboxButton
            className={clsx(
              "relative w-full py-2 pl-10 pr-3 text-right bg-gray-100 rounded-lg shadow-md cursor-default dark:bg-gray-700 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
            )}
          >
            <div className="flex flex-wrap gap-1">
              {selected && selected.length > 0 ? (
                selected.map((person) => (
                  <div
                    key={person.value}
                    className="flex items-center gap-1 bg-gray-700 rounded px-2 py-1"
                  >
                    {person.label}
                    <XMark
                      className="w-4 h-4 cursor-pointer"
                      aria-hidden="true"
                      onClick={(e) => handleRemove(e, person)}
                    />
                  </div>
                ))
              ) : (
                <span className="text-white"> - </span>
              )}
            </div>
            <span className="absolute inset-y-0 flex items-center pr-2 pointer-events-none left-2">
              <ChevronDown
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute w-full py-1 mt-1 overflow-auto max-h-40 text-base bg-gray-100 rounded-md shadow-lg dark:bg-gray-700 ring-1 ring-black/5 focus:outline-none sm:text-sm z-10">
              {items.map(renderItem)}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </>
  );
}
