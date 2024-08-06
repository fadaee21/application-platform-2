import ActivateProduct from "@/components/product/product/ActivateProduct";
import AllProducts from "@/components/product/product/AllProducts";
import DeactivateProduct from "@/components/product/product/DeactivateProduct";
import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Plus from "@/assets/icons/plus.svg?react";
import router from "@/routes";
const Products = () => {
  const handleRoute = () => router.navigate("add");

  return (
    <>
      <div className="w-full flex justify-end">
        <PrimaryButtons onClick={handleRoute} className="mb-4">
          <Plus className="w-6 h-6 ml-4" />
          افزودن محصول
        </PrimaryButtons>
      </div>
      <div className="p-4 rounded flex flex-col md:flex-row justify-between shadow-md bg-slate-50 dark:bg-slate-700  text-slate-700 dark:text-slate-300">
        <div className="w-full">
          <TabGroup>
            <TabList className="flex gap-4">
              {categories.map(({ name }) => (
                <Tab
                  key={name}
                  className={
                    "rounded-xl border border-slate-300 dark:border-slate-600 px-3 py-1.5 text-sm font-medium data-[selected]:bg-slate-200 dark:data-[selected]:bg-slate-600  "
                  }
                >
                  {name}
                </Tab>
              ))}
            </TabList>
            <TabPanels className="mt-3">
              {categories.map(({ name, Component }) => (
                <TabPanel
                  key={name}
                  className="rounded-xl p-3 border border-slate-300 dark:border-slate-600 "
                >
                  {Component}
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </>
  );
};

export default Products;

const categories = [
  {
    name: "همه",
    Component: <AllProducts />,
  },
  {
    name: "فعال",
    Component: <ActivateProduct />,
  },
  {
    name: "غیر فعال",
    Component: <DeactivateProduct />,
  },
];
