import Badge from "@/components/ui-kit/Badge";
import CheckBoxNew from "@/components/ui-kit/CheckBoxNew";
import ImageShow from "@/components/ui-kit/images/ImageShow";
// import useGetImage from "@/hooks/useGetImage";

interface ProductsListStructureProps {
  res: ProductSearchResponse[];
}

const ProductsListStructure: React.FC<ProductsListStructureProps> = ({
  res,
}) => {
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
          <th className="p-2 text-center">برچسب ها</th>
        </tr>
      </thead>
      <tbody>
        {res.map((product) => (
          <tr className="border-t" key={product.id}>
            <td className="p-2 text-start">
              <CheckBoxNew />
            </td>
            <td className="p-2 text-start">
              {product.images[0] ? (
                <div className="w-10 h-10 mr-2 rounded-full overflow-hidden ">
                  <ImageShow alt="product" imageAddress={product.images[0]} />
                </div>
              ) : (
                <div className="w-10 h-10 mr-2 rounded-full border border-slate-300 dark:border-slate-600" />
              )}
            </td>
            <td className="p-2 text-start w-1/3">
              <span>{product.name}</span>
            </td>
            <td className="p-2 text-center">
              <Badge
                color={product.status === 1 ? "green" : "gray"}
                text={product.status === 1 ? "فعال" : "غیر فعال"}
              />
            </td>
            <td className="p-2 text-center flex gap-2 justify-center">
              {product.tags.length > 0
                ? product.tags.map((tags) => {
                    return (
                      <Badge key={tags.id} color="gray" text={tags.name} />
                    );
                  })
                : "-"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductsListStructure;
