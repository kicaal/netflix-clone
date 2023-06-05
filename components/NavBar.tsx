import Image from "next/image";
import NavBarItem from "./NavBarItem";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import MobileMenu from "./MobileMenu";
import { useCallback, useEffect, useState } from "react";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66;

const NavBar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu(!showMobileMenu);
  }, [showMobileMenu]);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu(!showAccountMenu);
  }, [showAccountMenu]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollIsHigherThanOffset = !!(window.scrollY >= TOP_OFFSET);
      setShowBackground(scrollIsHigherThanOffset);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`${
          showBackground ? "bg-zinc-900 bg-opacity-90" : ""
        } px-4 md:px-16 py-6 flex flex-row items-center transition duration-500`}
      >
        <Image src="/images/logo.png" alt="Nav logo" width="96" height="48" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavBarItem label="Home" />
          <NavBarItem label="Series" />
          <NavBarItem label="Films" />
          <NavBarItem label="New & Popular" />
          <NavBarItem label="My List" />
          <NavBarItem label="Search by languages" />
        </div>
        <div
          onClick={toggleMobileMenu}
          role="button"
          className="lg:hidden flex flex-row items-center relative gap-2 ml-8"
        >
          <p className="text-white text-sm">Search</p>
          <BsChevronDown
            className={`text-white transition ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div
            role="button"
            className="text-gray-200 hover:text-gray-300 transition"
          >
            <BsSearch />
          </div>
          <div
            role="button"
            className="text-gray-200 hover:text-gray-300 transition"
          >
            <BsBell />
          </div>
          <div
            role="button"
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <Image
                className="w-6 h-6 lg:w-10 lg:h-10"
                src="/images/default-blue.png"
                alt="user logo"
                width={24}
                height={24}
              />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
