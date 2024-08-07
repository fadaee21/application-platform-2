import { TextField } from "@/components/login/TextField";
import Badge from "@/components/ui-kit/Badge";
import MySwitch from "@/components/ui-kit/MySwitch";

const StockComp = () => {
  return (
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="text-start pb-4 w-2/3">نام محصول</th>
            <th className="text-start pb-4 w-1/3">موجودی</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-start border border-slate-300 dark:border-slate-600">
              <div className="w-full">
                <div className="flex items-center justify-start gap-2 p-4 border-b border-slate-300 dark:border-slate-600">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="product"
                    className="w-10 h-10 mr-2 rounded-full"
                  />
                  <p>محصول تستی 1</p>
                </div>
                <div className="flex border-b border-slate-300 dark:border-slate-600">
                  <div className="w-1/2 p-4 flex justify-center border-l border-slate-300 dark:border-slate-600">
                    <MySwitch
                      checked={true}
                      onChange={() => {}}
                      label="فعال"
                      noSpace
                    />
                  </div>
                  <div className="w-1/2 p-4 flex justify-center">
                    <MySwitch
                      checked={false}
                      onChange={() => {}}
                      label="هشدار اتمام"
                      noSpace
                    />
                  </div>
                </div>
                <div className="w-full border-b border-slate-300 dark:border-slate-600">
                  <div className="w-full p-4 flex justify-start">
                    <MySwitch
                      checked={true}
                      onChange={() => {}}
                      label="فروش محصولات بر اساس موجودی تعریف شده در سیستم"
                      noSpace
                    />
                  </div>
                </div>
                <div className="w-full border-b border-slate-300 dark:border-slate-600">
                  <div className="w-full p-4 flex justify-start">
                    <MySwitch
                      checked={true}
                      onChange={() => {}}
                      label="نمایش محصول به مشتری"
                      noSpace
                    />
                  </div>
                </div>
                <div className="w-full">
                  <div className="w-full p-4 flex justify-start">
                    <Badge color="green" text="موجود" />
                  </div>
                </div>
              </div>
            </td>
            <td className="border border-slate-300 dark:border-slate-600">
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
              <div className="w-full h-28"></div>
            </td>
          </tr>
        </tbody>
      </table>
  );
};

export default StockComp;