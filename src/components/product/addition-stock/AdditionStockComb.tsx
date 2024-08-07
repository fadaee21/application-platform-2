import { TextField } from "@/components/login/TextField";
import Badge from "@/components/ui-kit/Badge";
import MySwitch from "@/components/ui-kit/MySwitch";

const AdditionStockComb = () => {
  return (
    <table className="min-w-full border-collapse">
      <thead>
        <tr>
          <th className="text-start pb-4 w-2/3">نام افزودنی</th>
          <th className="text-start pb-4 w-1/3">موجودی</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td  colSpan={2} className="text-start  border border-slate-300 dark:border-slate-600">
            <div className="w-full p-4 flex justify-start bg-slate-200 dark:bg-slate-700">
              <p>قاشق و چنگال</p>
            </div>
          </td>
        </tr>
        <tr>
          <td className="text-start border-t-4 border border-slate-300 dark:border-slate-600">
            <div className="w-full border-b border-slate-300 dark:border-slate-600">
              <div className="w-full p-4 flex justify-start">
                <p>قاشق</p>
              </div>
            </div>
            <div className="w-full border-b border-slate-300 dark:border-slate-600">
              <div className="w-full p-4 flex justify-start">
                <MySwitch
                  checked={true}
                  onChange={() => {}}
                  label="فعال"
                  noSpace
                />
              </div>
            </div>
            <div className="w-full border-b border-slate-300 dark:border-slate-600">
              <div className="w-full p-4 flex justify-start">
                <MySwitch
                  checked={true}
                  onChange={() => {}}
                  label="فروش پس از اتمام موجودی"
                  noSpace
                />
              </div>
            </div>
            <div className="w-full">
              <div className="w-full p-4 flex justify-start">
                <Badge color="green" text="موجود" />
              </div>
            </div>
          </td>
          <td className="border border-t-4 border-slate-300 dark:border-slate-600">
              <div className="w-full p-4">
                <TextField
                  placeholder="موجودی"
                  state=""
                  label="تعداد موجودی"
                  onChange={() => {}}
                  id="stock"
                  name="stock"
                />
              </div>
              <div className="w-full p-4">
                <TextField
                  placeholder="آستانه هشدار تمام شدن موجودی"
                  state=""
                  label="آستانه هشدار"
                  onChange={() => {}}
                  id="stock"
                  name="stock"
                />
              </div>
              
            </td>
        </tr>
        <tr>
          <td className="text-start border border-t-4 border-slate-300 dark:border-slate-600">
            <div className="w-full border-b border-slate-300 dark:border-slate-600">
              <div className="w-full p-4 flex justify-start">
                <p>چنگال</p>
              </div>
            </div>
            <div className="w-full border-b border-slate-300 dark:border-slate-600">
              <div className="w-full p-4 flex justify-start">
                <MySwitch
                  checked={true}
                  onChange={() => {}}
                  label="فعال"
                  noSpace
                />
              </div>
            </div>
            <div className="w-full border-b border-slate-300 dark:border-slate-600">
              <div className="w-full p-4 flex justify-start">
                <MySwitch
                  checked={true}
                  onChange={() => {}}
                  label="فروش پس از اتمام موجودی"
                  noSpace
                />
              </div>
            </div>
            <div className="w-full">
              <div className="w-full p-4 flex justify-start">
                <Badge color="green" text="موجود" />
              </div>
            </div>
          </td>
          <td className="border border-t-4 border-slate-300 dark:border-slate-600">
              <div className="w-full p-4">
                <TextField
                  placeholder="موجودی"
                  state=""
                  label="تعداد موجودی"
                  onChange={() => {}}
                  id="stock"
                  name="stock"
                />
              </div>
              <div className="w-full p-4">
                <TextField
                  placeholder="آستانه هشدار تمام شدن موجودی"
                  state=""
                  label="آستانه هشدار"
                  onChange={() => {}}
                  id="stock"
                  name="stock"
                />
              </div>
              
            </td>
        </tr>
      </tbody>
    </table>
  );
};

export default AdditionStockComb;
