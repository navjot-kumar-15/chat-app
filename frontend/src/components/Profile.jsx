import React, { useEffect, useState } from "react";
import { Modal, Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Kbd, Badge, Avatar } from "flowbite-react";
import { FloatingLabel } from "flowbite-react";
import {
  getUserChats,
  removeUserFromGroup,
  renameGroupChat,
  searchUser,
} from "../features/chat/chatSlice";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
const URL = import.meta.env.VITE_REACT_URL;

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

  const filterSelected = selected?.users?.filter((v) => {
    if (selected?.groupAdmin._id == userId) {
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
        chatId: selected && selected.chatName && selected._id,
        chatName: label,
      };
      dispatch(renameGroupChat(value));
      setLabel("");
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
                              d?._id === selected?.groupAdmin._id
                                ? ` [Admin]`
                                : ""
                            }`
                          : `${d?.name} ${
                              d?._id === selected?.groupAdmin._id
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
                                  // dispatch(singleChat(q?._id));
                                  // handleClose();
                                  // dispatch(setSelected(q));
                                  // setInput("");
                                }}
                              >
                                <div className="block flex justify-center items-center gap-[2rem]">
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
                      )}
                    </div>
                  </form>
                )}
                <div className="flex justify-between mt-[2rem]">
                  <Button
                    onClick={() => {
                      setEditable(!editable);
                      handleUpdate();
                    }}
                  >
                    {editable ? "Update" : "Edit"}
                  </Button>
                  {editable ? (
                    <Button color="failure" onClick={() => setEditable(false)}>
                      Cancel
                    </Button>
                  ) : (
                    <Button color="failure">Leave</Button>
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
