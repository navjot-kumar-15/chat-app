import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import { getAllMessages, sendMessage } from "../features/chat/messageSlice";
import { toast } from "react-toastify";
import { Avatar } from "flowbite-react";
const URL = import.meta.env.VITE_REACT_URL;

const Messages = () => {
  const [emoji, setEmoji] = useState(false);
  const emojiPickerRef = useRef(null);
  const [valueInput, setValueInput] = useState("");
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { messages } = useSelector((state) => state.message);
  const { selected } = useSelector((state) => state.chat);
  const [messageLength, setMessageLength] = useState(messages.length);
  const handleEmojiClick = (d) => {
    setValueInput((prev) => prev + d.emoji);
  };

  const handleClickOutside = (event) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target)
    ) {
      setEmoji(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // console.log(selected);

  useEffect(() => {
    if (selected) {
      dispatch(
        getAllMessages(selected?.chat ? selected?.chat?._id : selected?._id)
      );
    }
  }, [selected, messages.length]);

  return (
    <>
      <div className="flex h-[100%] w-[100%] antialiased text-gray-800">
        {selected && (
          <div className="flex flex-row h-[90vh] overflow-x-hidden  pt-5">
            <div className="flex flex-col flex-auto h-full">
              <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full max-md:p-4">
                <div className="flex flex-col h-full overflow-auto   scrollbar-hidden mb-4 w-[78vw] max-lg:w-[97vw] max-lg:ml-3  max-md:w-[94vw] max-md:-ml-0 ">
                  <div className="flex flex-col h-full">
                    <div className="grid grid-cols-12 gap-y-2">
                      {messages &&
                        messages?.map((v) => (
                          <>
                            {v.sender?._id !== userInfo?.details?._id ? (
                              <div className="col-start-1 col-end-8 p-3 max-md:p-0 max-sm:p-0 rounded-lg">
                                <div className="left flex flex-row items-center">
                                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                    <Avatar
                                      img={`${
                                        v?.sender?.pic?.startsWith("http")
                                          ? `${v?.sender?.pic}`
                                          : `${URL}${v?.sender?.pic}`
                                      }`}
                                      alt="avatar of Jese"
                                      rounded
                                    />
                                  </div>
                                  <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                    <div>{v?.content}</div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="right col-start-6 col-end-13 p-3 rounded-lg">
                                <div className="flex items-center justify-start flex-row-reverse">
                                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                    <Avatar
                                      img={`${
                                        v?.sender?.pic?.startsWith("http")
                                          ? `${v?.sender?.pic}`
                                          : `${URL}${v?.sender?.pic}`
                                      }`}
                                      alt="avatar of Jese"
                                      rounded
                                    />
                                  </div>
                                  <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                    <div>{v?.content}</div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Input box  */}
                <form
                  className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!selected || !valueInput) {
                      toast.warning("Please enter something to send message");
                      return;
                    }
                    const value = {
                      chatId: selected?.chat
                        ? selected?.chat?._id
                        : selected?._id,
                      content: valueInput,
                    };

                    dispatch(sendMessage(value));
                    // dispatch(
                    //   getAllMessages(
                    //     selected?.chat ? selected?.chat?._id : selected?._id
                    //   )
                    // );
                    setValueInput("");
                  }}
                >
                  <div>
                    <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="flex-grow ml-4">
                    <div className="relative w-full">
                      <input
                        type="text"
                        className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                        onChange={(e) => {
                          setValueInput(e.target.value);
                        }}
                        value={valueInput}
                      />
                      <span
                        onClick={() => setEmoji(!emoji)}
                        className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {emoji && (
                          <div
                            ref={emojiPickerRef}
                            className="absolute right-0 top-[-30rem] z-30 max-md:w-[40vw] max-md:right-[3rem] max-sm:w-[20vw] max-sm:right-[9rem]"
                          >
                            <EmojiPicker onEmojiClick={handleEmojiClick} />
                          </div>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <button
                      type="submit"
                      className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                    >
                      <span>Send</span>
                      <span className="ml-2">
                        <svg
                          className="w-4 h-4 transform rotate-45 -mt-px"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default memo(Messages);
