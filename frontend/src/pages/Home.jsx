import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Button, Badge, Avatar } from "flowbite-react";
import SideBar from "../components/SideBar";
import SearchUser from "../components/SearchUser";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "flowbite-react";
import {
  getUserChats,
  groupUsers,
  setSelected,
} from "../features/chat/chatSlice";
import Messages from "../components/Messages";
import GroupModal from "../components/GroupModal";

const URL = import.meta.env.VITE_REACT_URL;

const Home = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { chatLists, selected } = useSelector((state) => state.chat);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const token = JSON.parse(localStorage.getItem("token"));

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (userInfo && userInfo.success === 0) {
      navigate("/login");
    }
  }, [userInfo, navigate]);
  // Fetch user info and chats on component mount
  useEffect(() => {
    dispatch(getUserInfo());
  }, [token]);

  useEffect(() => {
    dispatch(getUserChats());
  }, [selected]);

  function capitalizeWord(str) {
    return str.charAt(0).toUpperCase() + str.slice(1, str.length);
  }

  return (
    <>
      <Header
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleClose={() => setIsOpen(false)}
      />

      <div className="min-h-[91vh] min-w-[100%] flex gap-2">
        <div
          className={`left flex flex-col gap-3 w-[20%] max-lg:w-[30%] p-3 overflow-hidden bg-gray-200 max-md:w-[100%] ${
            selected ? "max-md:hidden" : "max-md:block"
          }`}
        >
          <div
            className="search w-[100%] flex justify-center cursor-pointer max-md:hidden"
            onClick={() => setIsOpen(true)}
          >
            <Tooltip content="Click to search">
              <p>
                Search <i className="ri-search-2-line pl-3"></i>
              </p>
            </Tooltip>
          </div>
          <SideBar
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            handleClose={() => setIsOpen(false)}
          >
            <SearchUser handleClose={() => setIsOpen(false)} />
          </SideBar>
          <div className="chats flex flex-col items-center justify-center mt-4">
            <div className="mb-[2rem] flex items-center gap-6 justify-between">
              <h1 className=" font-bold text-xl">My Chats</h1>
              <button
                className="text-[.8rem] bg-blue-300 hover:bg-blue-400 transition-all cursor-pointer font-bold p-2 rounded-md"
                onClick={() => setOpenModal(true)}
              >
                Create Group <i class="ri-add-line"></i>
              </button>
              <GroupModal openModal={openModal} setOpenModal={setOpenModal} />
            </div>
            {chatLists?.map((d, i) => (
              <>
                {d?.users?.map((v) => (
                  <>
                    {userInfo?.details?._id !== v._id && (
                      <Badge
                        color="success"
                        className={`mb-4 max-md:w-[50vw] cursor-pointer ${
                          selected?._id === d?._id
                            ? "bg-green-400 text-white"
                            : ""
                        }`}
                        key={d?._id}
                        onClick={() => {
                          if (d.isGroupChat) {
                            dispatch(setSelected({ chatName: d.chatName }));
                            dispatch(groupUsers(d.users));
                          } else {
                            dispatch(setSelected(v));
                          }
                        }}
                      >
                        <div className="flex items-center w-[15vw] max-lg:w-[22vw] max-md:w-[100%] p-2 gap-5">
                          <span className="font-bold">{i + 1}</span>
                          <span className=" max-md:mr-8">
                            <Avatar img={`${URL}${v?.pic}`} alt="" rounded />
                          </span>
                          <span className="max-md:text-lg text-lg flex flex-col">
                            <span className="text-sm">
                              {d?.isGroupChat && "Group"}
                            </span>
                            {d?.isGroupChat ? d.chatName : v.name}
                          </span>
                        </div>
                      </Badge>
                    )}
                  </>
                ))}
              </>
            ))}
          </div>
        </div>
        <div
          className={`right flex flex-col w-[80%] max-md:w-[100%] relative ${
            selected ? "max-md:block" : "max-md:hidden"
          } `}
        >
          <div
            className="chat-name p-2 bg-gray-200 w-[100%] text-center absolute top-0 z-30"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
          >
            <p className="font-bold">
              {selected
                ? capitalizeWord(
                    selected.chatName
                      ? `${selected?.chatName} (Group)`
                      : selected?.name
                  )
                : "Not selected any chat"}
            </p>
          </div>
          <div className="min-h-[94%] pt-[2rem]">
            <Messages />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
