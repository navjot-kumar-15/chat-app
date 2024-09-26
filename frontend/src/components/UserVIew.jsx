import React from "react";
import { Button, Modal } from "flowbite-react";
import { useSelector } from "react-redux";
const URL = import.meta.env.VITE_REACT_URL;

const UserVIew = ({ setPView, pView }) => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <Modal show={pView} onClose={() => setPView(false)}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <>
            {/* component */}
            <div className=" p-5">
              <img
                className="w-32 h-32 rounded-full mx-auto"
                src={`${
                  userInfo?.details?.pic?.startsWith("http")
                    ? `${userInfo?.details?.pic}`
                    : `${URL}${userInfo.details?.pic}`
                }`}
                alt="Profile picture"
              />
              <h2 className="text-center text-2xl font-semibold mt-3">
                {userInfo?.details?.name}
              </h2>
              <p className="text-center text-gray-600 mt-1">
                {userInfo?.details?.email}
              </p>
            </div>
          </>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserVIew;
