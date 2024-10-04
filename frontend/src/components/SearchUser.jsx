import React, { useState, memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetQuery,
  searchUser,
  setSelected,
  singleChat,
} from "../features/chat/chatSlice";
import { Avatar, Badge, Button } from "flowbite-react";
import { URL } from "../config/utils";

const SearchUser = ({ handleClose, isOpen, setIsOpen }) => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const { isLoading, query } = useSelector((state) => state.chat);
  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  return (
    <>
      <div className="flex flex-col gap-4 justify-center w-[100%]">
        <form className="search-input flex gap-3 items-center justify-center">
          <input
            type="text"
            placeholder="Search here..."
            className="border-b-[.5px] outline-none ]"
            value={input}
            onChange={handleChange}
          />
          <Button color="dark" onClick={() => dispatch(searchUser(input))}>
            Go
          </Button>
        </form>
        <div className="search-result">
          {isLoading ? (
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-[2vh] bg-gray-200 rounded-full dark:bg-gray-700 w-[100%] mb-4" />
              <div className="h-[2vh] bg-gray-200 rounded-full dark:bg-gray-700 w-[100%] mb-4" />
              <div className="h-[2vh] bg-gray-200 rounded-full dark:bg-gray-700 w-[100%] mb-4" />
              <div className="h-[2vh] bg-gray-200 rounded-full dark:bg-gray-700 w-[100%] mb-4" />
              <div className="h-[2vh] bg-gray-200 rounded-full dark:bg-gray-700 w-[100%] mb-4" />
            </div>
          ) : (
            query &&
            query?.details?.map((q, i) => (
              <Badge
                color="info"
                className="p-2 w-[100%] overflow-hidden cursor-pointer "
                onClick={() => {
                  dispatch(singleChat(q?._id));
                  setIsOpen(false);
                  dispatch(setSelected(q));
                  setInput("");
                  dispatch(resetQuery());
                }}
              >
                <div className="block flex justify-center items-center gap-[2rem]">
                  <span>
                    <Avatar
                      img={`${
                        q?.pic?.startsWith("https")
                          ? `${q?.pic}`
                          : `${URL}${q?.pic}`
                      }`}
                      alt="avatar of Jese"
                      rounded
                    />
                  </span>
                  <span className="text-lg font-bold">{q?.name}</span>
                </div>
                {/* <div className="w-auto border-b border-red-800"> */}
                <hr className="w-[240%] border-b border-gray-300 mt-2" />
                {/* </div> */}
              </Badge>
            ))
          )}
        </div>
      </div>
    </>
  );
};
export default memo(SearchUser);
