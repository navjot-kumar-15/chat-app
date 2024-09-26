import React, { useState, memo, useEffect } from "react";
import {
  Button,
  Checkbox,
  Label,
  Modal,
  TextInput,
  Badge,
  Avatar,
} from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import chatSlice, {
  createGroupChat,
  getUserChats,
  resetQuery,
  searchUser,
} from "../features/chat/chatSlice";
import { toast } from "react-toastify";

const URL = import.meta.env.VITE_REACT_URL;

const GroupModal = ({ openModal, setOpenModal, text }) => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const { query, isSuccess, chatLists } = useSelector((state) => state.chat);
  const [chat, setChat] = useState("");

  useEffect(() => {
    dispatch(getUserChats());
  }, []);

  return (
    <>
      <div className="">
        <Modal
          show={openModal}
          size="xl"
          onClose={() => setOpenModal(false)}
          popup
          className="max-md:pt-[10rem]"
        >
          <Modal.Header />
          <Modal.Body className="mb-5">
            <div className="space-y-6 h-[30vh]">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Create Group Chat
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="chatName" value="Chat Name" />
                </div>
                <TextInput
                  id="chatName"
                  placeholder="Enter Chat Name"
                  // value={email}
                  onChange={(e) => setChat(e.target.value)}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="addUser" value="Add Users" />
                  <div className="pl-3 flex gap-3 flex-wrap">
                    {users &&
                      users?.map((d) => (
                        <Badge
                          color="gray"
                          className="flex flex-col w-[5vw] gap-3"
                        >
                          <div className="flex gap-3">
                            <p className="text-start">{d?.name}</p>
                            <p
                              className="float-right cursor-pointer"
                              onClick={() => {
                                setUsers((prev) =>
                                  prev.filter((c) => c._id !== d._id)
                                );
                              }}
                            >
                              X
                            </p>
                          </div>
                        </Badge>
                      ))}
                  </div>
                </div>
                <div className="w-[80%] relative">
                  <div className="flex gap-2 w-[100%] flex-col">
                    <TextInput
                      id="addUser"
                      type="text"
                      required
                      placeholder="Enter name or email eg:John or john@gmail.com"
                      onChange={(e) => {
                        dispatch(searchUser(e.target.value));
                      }}
                    />
                    <div className="overflow-auto w-[100%] flex gap-2 flex-wrap mb-4  ">
                      {query &&
                        query?.details?.slice(0, 3)?.map((q, i) => (
                          <Badge
                            color="info"
                            className="p-2 flex  overflow-hidden cursor-pointer w-fit"
                            onClick={() => {
                              // Todo : Duplicate entry passing
                              setUsers([...users, q]);
                              dispatch(resetQuery());
                            }}
                          >
                            <div className=" flex justify-center items-center gap-[2rem]">
                              <span>
                                <Avatar
                                  img={`${URL}${q?.pic}`}
                                  alt="avatar of Jese"
                                  rounded
                                />
                              </span>
                              <span className="text-lg font-bold">
                                {q?.name}
                              </span>
                            </div>
                          </Badge>
                        ))}
                    </div>
                  </div>
                  {text == "Create" ? (
                    <Button
                      onClick={() => {
                        const data = {
                          name: chat,
                          users: JSON.stringify(users),
                        };

                        dispatch(createGroupChat(data));
                        if (isSuccess) {
                          toast.success("Group Created successfully");
                        }
                      }}
                    >
                      Create
                    </Button>
                  ) : (
                    <div className="flex gap-5">
                      <Button color="success">Update</Button>
                      <Button color="failure">Leave</Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div></div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default memo(GroupModal);
