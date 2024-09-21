import React from "react";
import { Button } from "flowbite-react";
import SideBar from "./SideBar";
const Header = ({isOpen, setIsOpen, handleClose}) => {
  return (
    <div className="flex items-center h-[5vh] p-3">
      <div className="logo flex-1">Logo</div>
      <div className="user flex gap-4 items-center">
        <div>User</div>

        <div className="hidden max-md:block">
          <p onClick={() => setIsOpen(true)}><i className="ri-menu-3-line text-2xl font-bold"></i></p>
        <SideBar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleClose={handleClose}
        />
        </div>
      </div>
    </div>
  );
};

export default Header;
