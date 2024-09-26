import React, { useState } from "react";
import { Modal, Button } from "flowbite-react";
import { useSelector } from "react-redux";
import { Kbd } from "flowbite-react";
const URL = import.meta.env.VITE_REACT_URL;

const Profile = ({ setProfileView, profileView, children }) => {
  const { selected } = useSelector((state) => state.chat);
  const [modalPlacement, setModalPlacement] = useState("center");

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
                  {selected?.users?.map((d) => (
                    <span className="">
                      <Kbd className="flex gap-4">
                        {d?.name}{" "}
                        <i className="cursor-pointer ri-close-line"></i>
                      </Kbd>
                    </span>
                  ))}
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
