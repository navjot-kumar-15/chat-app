import Message from "../models/messageModel.js";
import Chat from "../models/chatModel.js";

// Send Message
export const sendMessage = async (req, res) => {
  try {
    const { chatId, content } = req.body;

    if (!chatId || !content) {
      return res.send({
        success: 0,
        message: "Please enter required fields",
      });
    }

    let message = {
      sender: req.user._id,
      chat: chatId,
      content,
    };

    let newMessage = await Message.create(message);
    newMessage = await Message.findById(newMessage._id).populate(
      "sender",
      "name pic email"
    );
    const latestMessage = await Chat.findByIdAndUpdate(
      chatId,
      {
        latestMessage: newMessage._id,
      },
      { new: true }
    );
    return res.send({
      success: 1,
      message: "Message created successfully",
      details: newMessage,
    });
  } catch (error) {
    return res.send({
      success: 0,
      message: error.message,
    });
  }
};

// All message of particular chat
export const allSingleChat = async (req, res) => {
  try {
    const { chatId } = req.params;

    if (!chatId) {
      return res.status(400).send({
        success: 0,
        message: "Please provide chat id",
      });
    }

    const findAllMessage = await Message.find({ chat: chatId }).populate(
      "sender",
      "name pic email"
    );

    if (!findAllMessage.length) {
      return res.send({
        success: 0,
        message: "No messages found for this chat",
      });
    }

    return res.send({
      success: 1,
      message: "Fetched all messages",
      details: findAllMessage,
    });
  } catch (error) {
    return res.send({
      success: 0,
      message: error.message || "An unexpected error occurred",
    });
  }
};
