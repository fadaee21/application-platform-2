// src/components/ListAddress.tsx
import { KeyedMutator } from "swr";
import UserAddress from "./UserAddress";

interface IProps {
  data: IAddressUserNew[];
  mutate: KeyedMutator<IAddressUserNew[]>;
  accountId?: string;
}

const ListAddress = ({ data, mutate, accountId }: IProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full">
      {data.map((address) => (
        <div
          key={address.name}
          className="w-full p-1  rounded shadow-md bg-slate-50 dark:bg-slate-700"
        >
          <UserAddress
            address={address}
            mutate={mutate}
            accountId={accountId}
          />
        </div>
      ))}
    </div>
  );
};

export default ListAddress;
