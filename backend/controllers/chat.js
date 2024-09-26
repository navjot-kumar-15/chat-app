import Chat from "../models/chatModel.js";
import User from "../models/userModel.js";

// Access single Chat
export const singleChat = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.send({
        success: 0,
        message: "Please provide userId",
      });
    }

    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");
    // return res.send(isChat)

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    if (isChat && isChat.length > 0) {
      return res.send({
        success: 1,
        message: "Chat fetched successfully",
        details: isChat[0],
      });
    } else {
      let chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };
      const createChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createChat._id }).populate(
        "users",
        "-password"
      );
      return res.send({
        success: 1,
        message: "Chat created successfully",
        details: fullChat,
      });
    }
  } catch (error) {
    return res.send({
      success: 0,
      message: error.message,
    });
  }
};

export const getUserChats = async (req, res) => {
  try {
    const userChats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updateAt: -1 });
    if (!userChats) {
      return res.send({
        success: 0,
        message: "No chats found",
      });
    }
    return res.send({
      success: 1,
      message: "Chats fetched successfully",
      details: userChats,
    });
  } catch (error) {
    return res.send({
      success: 0,
      message: error.message,
    });
  }
};

export const createGroupChat = async (req, res) => {
  try {
    const { name, users } = req.body;
    if (!name || !users) {
      return res.send({
        success: 0,
        message: "Please enter all the required fields",
      });
    }

    const userData = JSON.parse(users);
    if (userData.length < 2) {
      return res.send({
        success: 0,
        message: "Please enter atleast 2 users",
      });
    }

    // Including loggedIn user also
    userData.push(req.user._id);

    // Now create a group
    const createChat = await Chat.create({
      chatName: name,
      isGroupChat: true,
      users: userData,
      groupAdmin: req.user._id,
    });

    const getGroupChat = await Chat.findOne({ _id: createChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    return res.send({
      success: 1,
      message: "Group created successfully",
      details: getGroupChat,
    });
  } catch (error) {
    return res.send({
      success: 0,
      message: error.message,
    });
  }
};

export const renameGroup = async (req, res) => {
  try {
    const { chatId, chatName } = req.body;
    if (!chatId || !chatName) {
      return res.send({
        success: 0,
        message: "Please enter all the required fields",
      });
    }

    const renameChat = await Chat.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    return res.send({
      success: 1,
      message: "Chat Rename successfully",
      details: renameChat,
    });
  } catch (error) {
    return res.send({
      success: 0,
      message: error.message,
    });
  }
};

export const addToGroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body;
    if ((!chatId, userId)) {
      return res.send({
        success: 0,
        message: "Please enter all the required fields",
      });
    }

    const addUser = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      { new: true }
    );

    return res.send({
      success: 1,
      message: "User added successfully",
      details: addUser,
    });
  } catch (error) {
    return res.send({
      success: 0,
      messag: error.message,
    });
  }
};

export const removeFromGroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body;

    if ((!chatId, !userId)) {
      return res.send({
        success: 0,
        message: "Please enter all the required fields",
      });
    }
    //   Check userId of admin or not
    const admin = await Chat.findById(chatId);
    if (userId === admin.groupAdmin.toString()) {
      return res.send({
        success: 0,
        message: "You cannot remove the admin",
      });
    }
    const removeUser = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { users: userId } },
      { new: true }
    ).populate("users");

    return res.send({
      success: 1,
      message: "User removed successfully",
      details: removeUser,
    });
  } catch (error) {
    return res.send({
      success: 0,
      message: error.message,
    });
  }
};
