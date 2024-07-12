import { PrimaryButtons } from "./buttons/PrimaryButtons";

interface IProps{
    textContent:string;
    admitFunc:() => void;
    rejectFunc:() => void;
}

const ModalWarningContent = ({textContent, admitFunc, rejectFunc}:IProps) => {
  return (
    <>
      <p className="text-slate-700 dark:text-slate-300">
        {textContent}
      </p>
      <div className="flex justify-end gap-4 mt-4">
        <PrimaryButtons onClick={rejectFunc}>خیر</PrimaryButtons>
        <PrimaryButtons onClick={admitFunc}>بله</PrimaryButtons>
      </div>
    </>
  );
};

export default ModalWarningContent;
