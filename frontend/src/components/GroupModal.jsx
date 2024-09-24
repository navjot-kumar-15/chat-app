import React from "react";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";

const GroupModal = ({ openModal, setOpenModal }) => {
  return (
    <>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
        className="max-md:pt-[10rem]"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
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
                // onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="addUser" value="Add Users" />
              </div>
              <div className="flex gap-2 w-[100%]">
                <TextInput
                  id="addUser"
                  className="w-[80%]"
                  type="text"
                  required
                />
                <Button>Add</Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GroupModal;
