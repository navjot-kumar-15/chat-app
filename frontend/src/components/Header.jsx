import React, { useEffect, useState } from "react";
import { Avatar, Dropdown, Button, Modal, Badge, HR } from "flowbite-react";
import SideBar from "./SideBar";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "../features/auth/authSlice";
import { searchUser } from "../features/chat/chatSlice";
import SearchUser from "./SearchUser";

const URL = import.meta.env.VITE_REACT_URL;

const Header = ({ isOpen, setIsOpen, handleClose }) => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { query } = useSelector((state) => state.chat);
  // console.log(query);
  return (
    <div className="flex items-center h-[8vh] p-3 pr-[4rem]">
      <div className="logo flex-1 font-extrabold text-3xl italic">Chatty</div>
      <div className="user flex gap-4 items-center max-md:ml-4">
        <div className="">
          <i className="ri-notification-line text-2xl mr-3 text-gray-500"></i>
        </div>
        <div>
          <div className="z-50">
            <Dropdown
              label={
                <Avatar
                  alt="User settings"
                  img="https://plus.unsplash.com/premium_photo-1666900440561-94dcb6865554?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  rounded
                />
              }
              arrowIcon={false}
              inline
              className="max-md:w-auto w-[8vw] z-50"
            >
              <Dropdown.Item>Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => setOpenModal(true)}>
                Sign out
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>

        <div className="hidden max-md:block">
          <p onClick={() => setIsOpen(true)}>
            <i className="ri-menu-3-line text-3xl font-bold text-gray-500"></i>
          </p>
          <SideBar
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            handleClose={handleClose}
          >
            <SearchUser />
          </SideBar>
        </div>
      </div>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
        className="max-md:pt-[18rem]"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to logout?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  dispatch(handleLogout());
                  setOpenModal(false);
                }}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Header;
