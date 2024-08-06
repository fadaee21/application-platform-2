import React from "react";
import Badge from "@/components/ui-kit/Badge";
import CheckBoxNew from "@/components/ui-kit/CheckBoxNew";

interface ProductsListStructureProps {
  res: unknown;
}

const ProductsListStructure: React.FC<ProductsListStructureProps> = ({
  res,
}) => {
  console.log({ res });
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="p-2">
            <CheckBoxNew />
          </th>
          <th className="p-2 text-start"></th>
          <th className="p-2 text-start w-1/2">نام محصول</th>
          <th className="p-2 text-center">وضعیت</th>
          <th className="p-2 text-center">تعداد گوناگونی</th>
          <th className="p-2 text-center">برچسب ها</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-t">
          <td className="p-2 text-start">
            <CheckBoxNew />
          </td>
          <td className="p-2 text-start">
            <img
              src="https://via.placeholder.com/40"
              alt="product"
              className="w-10 h-10 mr-2 rounded-full"
            />
          </td>
          <td className="p-2 text-start w-1/3">
            <span>محصول تستی 1</span>
          </td>
          <td className="p-2 text-center">
            <Badge color="green" text="فعال" />
          </td>
          <td className="p-2 text-center">ندارد</td>
          <td className="p-2 text-center">
            <Badge color="gray" text="برچسب تستی" />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ProductsListStructure;
