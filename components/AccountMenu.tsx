import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { FC } from "react";

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: FC<AccountMenuProps> = ({ visible }) => {
  const { user } = useCurrentUser();

  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <Image
            className="rounded-md w-8"
            src="/images/default-blue.png"
            alt="default-blue"
            width={32}
            height={32}
          />
          <p className="text-white text-sm group-hover/item:underline">
            {user.name}
          </p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4" />
        <div
          role="button"
          onClick={() => signOut()}
          className="px-3 text-center text-white text-sm hover:underline"
        >
          Sign Out of Netflix
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
