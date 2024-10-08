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
import {
  createGroupChat,
  getUserChats,
  resetQuery,
  searchUser,
} from "../features/chat/chatSlice";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { URL } from "../config/utils";

const GroupModal = ({ openModal, setOpenModal, text }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const { query } = useSelector((state) => state.chat);
  const [chat, setChat] = useState("");
  const [searchInput, setSearchInput] = useState("");

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
            <form
              className="space-y-6 h-[40vh]"
              onSubmit={handleSubmit((data) => {
                if (!data.name || !users) {
                  toast.error("Please enter all the fields");
                  return;
                }
                const data1 = {
                  name: data.name,
                  users: JSON.stringify(users),
                };

                dispatch(createGroupChat(data1));
                dispatch(getUserChats());
                setUsers([]);
              })}
            >
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
                  {...register("name", { required: "Please enter Chat Name" })}
                />
                {errors.name && (
                  <p className="text-red-700">{errors.name.message}</p>
                )}
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
                              <i class="ri-close-line"></i>
                            </p>
                          </div>
                        </Badge>
                      ))}
                  </div>
                </div>
                <div className="w-[80%] relative">
                  <div className="flex gap-2 w-[100%] flex-col">
                    <div className="flex gap-4">
                      <TextInput
                        id="addUser"
                        type="text"
                        className="w-[80%]"
                        required
                        placeholder="Enter name or email eg:John or john@gmail.com"
                        onChange={(e) => {
                          setSearchInput(e.target.value);
                        }}
                      />
                      <Button
                        color="dark"
                        className="w-[20%]"
                        onClick={() => {
                          if (!searchInput.length > 0) {
                            toast.error("Please enter something");
                            return;
                          }
                          dispatch(searchUser(searchInput));
                        }}
                      >
                        Search
                      </Button>
                    </div>
                    <div className="overflow-auto w-[100%] flex gap-2 flex-wrap mb-4  ">
                      {query && query?.details?.length > 0 ? (
                        query?.details?.slice(0, 3)?.map((q, i) => (
                          <Badge
                            color="info"
                            className="pl-1 pr-1 flex  overflow-hidden cursor-pointer w-fit"
                            onClick={() => {
                              // console.log(q);
                              if (users.find((d) => d._id === q._id)) {
                                toast.warning("Already added");
                                return;
                              }
                              // console.log();
                              // Todo : Duplicate entry passing
                              setUsers([...users, q]);
                              dispatch(resetQuery());
                              setSearchInput("");
                            }}
                          >
                            <div className=" flex justify-center items-center gap-[.9rem]">
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
                              <span className="text-lg font-bold">
                                {q?.name}
                              </span>
                            </div>
                          </Badge>
                        ))
                      ) : (
                        <span>No result found</span>
                      )}
                    </div>
                  </div>
                  {text == "Create" ? (
                    <Button type="submit">Create</Button>
                  ) : (
                    <div className="flex gap-5">
                      <Button color="success">Update</Button>
                      <Button color="failure">Leave</Button>
                    </div>
                  )}
                </div>
              </div>
            </form>
            <div></div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default memo(GroupModal);
