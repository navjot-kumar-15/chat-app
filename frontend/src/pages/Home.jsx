import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Button, Badge, Avatar } from "flowbite-react";
import SideBar from "../components/SideBar";
import SearchUser from "../components/SearchUser";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "flowbite-react";
import { getUserChats } from "../features/chat/chatSlice";

const URL = import.meta.env.VITE_REACT_URL;

const Home = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { query, chatLists } = useSelector((state) => state.chat);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  if (userInfo && userInfo.success == 0) {
    navigate("/login");
  }
  let filterUser = chatLists
    ?.map((chat) => {
      return chat.users;
    })
    .flat();
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  return (
    <>
      <Header isOpen={isOpen} setIsOpen={setIsOpen} handleClose={handleClose} />

      <div className="min-h-[91vh] min-w-[100%] flex gap-2">
        <div className="left flex flex-col gap-3 w-[20%] max-md:hidden p-3 overflow-hidden bg-gray-200">
          <div
            className="search w-[100%] flex justify-center cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <Tooltip content="Click to search">
              <p>
                Search <i className="ri-search-2-line pl-3"></i>
              </p>
            </Tooltip>
          </div>
          <SideBar
            className="block max-md:hidden"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            handleClose={handleClose}
          >
            <SearchUser handleClose={handleClose} />
          </SideBar>
          <div className="chats flex flex-col items-center justify-center mt-4">
            {filterUser &&
              filterUser?.map((d) => (
                <>
                  {d._id !== userInfo?.details._id && (
                    <Badge
                      color="success"
                      className="mb-4"
                      key={d._id}
                      onClick={(e) => console.log(d)}
                    >
                      <div className="flex items-center w-[15vw] p-2 gap-3">
                        <span>
                          <Avatar img={`${URL}${d?.pic}`} alt="" rounded />
                        </span>
                        <span>
                          {d?._id !== userInfo?.details?._id && d?.name}
                        </span>
                      </div>
                    </Badge>
                  )}
                </>
              ))}
          </div>
        </div>
        <div className="right flex flex-col w-[80%] max-md:w-[100%] p-3 relative bg-red-100">
          <div className="min-h-[94%]">messages</div>
          <form
            action=""
            className="flex gap-3 justify-between bg-gray-300 p-2 w-[100%]"
          >
            <input
              type="text"
              placeholder="Enter your message"
              className="w-[90%] p-1 focus:outline-none  bg-gray-300 placeholder:italic placeholder:text-black"
            />
            {/* <button className='bg-yellow-500 w-[20%]'>Send</button> */}
            <Button color="blue" className="w-[20%] outline-none border-none">
              Blue
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
