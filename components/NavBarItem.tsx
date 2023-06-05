import { FC } from "react";

interface NavBarItem {
  label: string;
}

const NavBarItem: FC<NavBarItem> = ({ label }) => {
  return (
    <div role="button" className="text-white hover:text-gray-300 transition">
      {label}
    </div>
  );
};

export default NavBarItem;
