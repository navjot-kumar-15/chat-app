import { Button, Drawer } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { resetQuery } from "../features/chat/chatSlice";

export default function SideBar({ isOpen, setIsOpen, handleClose, children }) {
  // const { query } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  return (
    <>
      <Drawer
        open={isOpen}
        onClose={() => {
          handleClose();
          dispatch(resetQuery());
        }}
      >
        <Drawer.Header title="Chatty App" />
        <Drawer.Items>{children}</Drawer.Items>
      </Drawer>
    </>
  );
}
