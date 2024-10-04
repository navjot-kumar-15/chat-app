import React, { useEffect, useState, memo } from "react";
import { Avatar, Dropdown, Button, Modal, Badge, HR } from "flowbite-react";
import SideBar from "./SideBar";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "../features/auth/authSlice";
import SearchUser from "./SearchUser";
import UserVIew from "./UserVIew";
import {
  getAllNotification,
  readNotification,
} from "../features/chat/notification";
import { defaultImage, socketConfig } from "../config/utils";

const URL = import.meta.env.VITE_REACT_URL;

const Header = ({ isOpen, setIsOpen, handleClose }) => {
  const [openModal, setOpenModal] = useState(false);
  const [pView, setPView] = useState(false);
  const dispatch = useDispatch();
  const { query, selected } = useSelector((state) => state.chat);
  const { userInfo, isLoading } = useSelector((state) => state.auth);
  const { count, notifications } = useSelector((state) => state.notification);

  // useEffect(() => {
  //   dispatch(getAllNotification());
  //   let socket = socketConfig();
  //   socket.emit("notification", notifications);
  // });

  return (
    <div className="flex items-center h-[8vh] p-3 pr-[2rem]">
      <div className="logo flex-1 font-extrabold text-3xl italic">Chatty</div>
      <div className="user flex gap-4 items-center max-md:ml-4">
        <div className="relative">
          <i
            className="ri-notification-line text-2xl mr-3 text-gray-500"
            onClick={async () => {
              await dispatch(readNotification());
              await dispatch(getAllNotification());
            }}
          ></i>
          <span className="absolute left-6 text-red-500 font-extrabold ">
            {count !== 0 ? count : ""}
          </span>
        </div>
        <div>
          <div className="z-50">
            <Dropdown
              label={
                <Avatar
                  alt="User settings"
                  // img={`${userInfo?.details?.pic?startsWith("http")` ` ? `${userInfo?.details?.pic}` : `${URL}${userInfo?.details?.pic}`}
                  img={`${
                    isLoading
                      ? `${defaultImage}`
                      : `${
                          userInfo?.details?.pic?.startsWith("http")
                            ? `${userInfo?.details?.pic}`
                            : `${URL}${userInfo?.details?.pic}`
                        }`
                  }`}
                  rounded
                />
              }
              arrowIcon={false}
              inline
              className="max-md:w-auto w-[10vw] max-lg:-w-[15vw] z-50"
            >
              <Dropdown.Item onClick={() => setPView(true)}>
                <span>Profile</span>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => setOpenModal(true)}>
                Sign out
              </Dropdown.Item>
            </Dropdown>
          </div>
          {pView && <UserVIew setPView={setPView} pView={pView} />}
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

export default memo(Header);
