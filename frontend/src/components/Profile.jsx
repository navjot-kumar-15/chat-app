import React, { useEffect, useState } from "react";
import { Modal, Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Kbd, Badge, Avatar } from "flowbite-react";
import { FloatingLabel } from "flowbite-react";
import {
  addUserInGroup,
  getUserChats,
  removeUserFromGroup,
  renameGroupChat,
  resetQuery,
  searchUser,
} from "../features/chat/chatSlice";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { URL } from "../config/utils";

const Profile = ({ setProfileView, profileView, children }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { selected } = useSelector((state) => state.chat);
  const { userInfo } = useSelector((state) => state.auth);
  const [modalPlacement, setModalPlacement] = useState("center");
  const dispatch = useDispatch();
  const { isLoading, query } = useSelector((state) => state.chat);
  const [input, setInput] = useState("");
  const [editable, setEditable] = useState(false);
  const [label, setLabel] = useState("");
  const [userId, setUserId] = useState("");
  const [lists, setLists] = useState([]);

  const filterSelected = selected?.users?.filter((v) => {
    if (selected?.groupAdmin?._id == userId) {
      toast.error("You cannot remove admin");
    } else {
      return v._id !== userId;
    }
  });

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  const handleUpdate = () => {
    if (label) {
      const value = {
        chatId: selected && selected?.chatName && selected?._id,
        chatName: label,
      };
      dispatch(renameGroupChat(value));
      setLabel("");
    }
    if (lists.length > 1) {
      return toast.error("For now you can add member one by one.");
    }

    if (lists.length > 0) {
      const value = {
        chatId: selected && selected.chatName && selected._id,
        userId: lists[0]?._id,
      };
      dispatch(addUserInGroup(value));
      dispatch(resetQuery());
      setLists([]);
    }
  };

  useEffect(() => {
    dispatch(searchUser(input));
  }, [dispatch, input]);

  useEffect(() => {
    dispatch(getUserChats());
  }, [selected]);

  return (
    <>
      <Modal
        show={profileView}
        position={modalPlacement}
        onClose={() => setProfileView(false)}
        className="max-md:pt-[10rem]"
      >
        <Modal.Header>
          <div className="max-auto">Profile View</div>
        </Modal.Header>
        <Modal.Body>
          <div className=" my-10 p-5">
            <img
              className="w-32 h-32 rounded-full mx-auto"
              src={`${
                selected && selected.chatName
                  ? "https://success-counseling.com/wp-content/themes/twentytwentyone-child/assets/images/team-dummy.jpg"
                  : `${
                      selected?.pic.startsWith("/avatar")
                        ? `${URL}/${selected.pic}`
                        : `${selected.pic}`
                    }`
              }`}
              alt="Profile picture"
            />
            <h2 className="text-center text-2xl font-semibold mt-3">
              {selected && selected?.chatName
                ? selected.chatName
                : selected?.name}
            </h2>

            {selected && selected?.chatName ? (
              <>
                {/* <p className="text-center"> group chat</p> */}
                <div className="mx-auto flex justify-center mt-4 gap-3 flex-wrap">
                  {filterSelected?.map((d) => (
                    <span className="">
                      <Kbd className="flex gap-4">
                        {d?._id === userInfo?.details?._id
                          ? `You  ${
                              d?._id === selected?.groupAdmin?._id
                                ? ` [Admin]`
                                : ""
                            }`
                          : `${d?.name} ${
                              d?._id === selected?.groupAdmin?._id
                                ? ` [Admin]`
                                : ""
                            } `}
                        <i
                          className="cursor-pointer ri-close-line"
                          onClick={() => {
                            setUserId(d?._id);
                            const value = {
                              chatId: selected?._id,
                              userId: d._id,
                            };
                            console.log(value);
                            dispatch(removeUserFromGroup(value));
                          }}
                        ></i>
                      </Kbd>
                    </span>
                  ))}
                </div>

                {editable && (
                  <form>
                    <FloatingLabel
                      variant="filled"
                      label="ChatName"
                      defaultValue={selected.chatName}
                      onChange={handleLabelChange}
                    />
                    <FloatingLabel
                      variant="filled"
                      label="Add User"
                      onChange={handleChange}
                      value={input}
                    />

                    <div className="pl-3 flex gap-3 flex-wrap mb-4">
                      {lists &&
                        lists?.map((d) => (
                          <Badge
                            color="gray"
                            className="flex flex-col w-[5vw] gap-3"
                          >
                            <div className="flex gap-3">
                              <p className="text-start">{d?.name}</p>
                              <p
                                className="float-right cursor-pointer"
                                onClick={() => {
                                  setLists((prev) =>
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

                    <div className="search-result">
                      {isLoading ? (
                        <div role="status" className="max-w-sm animate-pulse">
                          <div className="h-[1vh] bg-gray-200 rounded-full dark:bg-gray-700 w-[100%] mb-4" />
                          <div className="h-[1vh] bg-gray-200 rounded-full dark:bg-gray-700 w-[100%] mb-4" />
                          <div className="h-[1vh] bg-gray-200 rounded-full dark:bg-gray-700 w-[100%] mb-4" />
                        </div>
                      ) : (
                        <div className="flex gap-3 flex-wrap">
                          {query &&
                            query?.details?.slice(0, 4)?.map((q, i) => (
                              <Badge
                                color="info"
                                className="p-2 w-fit flex gap-3 overflow-hidden cursor-pointer"
                                onClick={() => {
                                  if (lists.find((d) => d._id === q._id)) {
                                    toast.warning("Already added");
                                    return;
                                  }
                                  setLists((prev) => [...prev, q]);
                                  dispatch(resetQuery());
                                }}
                              >
                                <div className="block flex justify-center items-center gap-[2rem]">
                                  <span>
                                    <Avatar
                                      img={`${
                                        q?.pic?.startsWith("http")
                                          ? `${q.pic}`
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
                            ))}
                        </div>
                      )}
                    </div>
                  </form>
                )}
                <div className="flex justify-between mt-[2rem]">
                  {editable ? (
                    <Button
                      onClick={() => {
                        setEditable(!editable);
                        handleUpdate();
                      }}
                    >
                      Update
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        setEditable(true);
                      }}
                    >
                      Edit
                    </Button>
                  )}
                  {editable ? (
                    <Button color="failure" onClick={() => setEditable(false)}>
                      Cancel
                    </Button>
                  ) : (
                    <Button
                      color="failure"
                      onClick={() => {
                        toast.warning(
                          "Sorry For the inconvenience this functionality will be added soon!!"
                        );
                      }}
                    >
                      Leave
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center mt-5">
                  {selected?.email}
                </div>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Profile;
