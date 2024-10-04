import Chat from "../models/chatModel.js";
import Message from "../models/messageModel.js";

// Get all the notifications
export const allUsersNotifications = async (req, res) => {
  try {
    const isChatMember = await Chat.find({
      users: { $in: req.user._id },
    });
    // return res.send(isChatMember);

    const finalResult = await Promise.all(
      isChatMember.map(async (v) => {
        const isNotification = await Message.find({
          $and: [
            { sender: { $ne: req.user._id } },
            { readBy: { $nin: req.user._id } },
            { chat: v._id },
          ],
        }).populate("chat", "isGroupChat users chatName");

        return isNotification ?? null;
      })
    );
    const filterResult = await finalResult
      .filter((d) => d != null && d !== undefined)
      .flat();
    return res.send({
      success: 1,
      message: "Users notifications fetched",
      count: filterResult.length,
      details: filterResult,
    });
  } catch (error) {
    return res.send({
      success: 0,
      message: error.message,
    });
  }
};

export const notificationReadd = async (req, res) => {
  try {
    const readedNotification = await Message.updateMany(
      {},
      { $addToSet: { readBy: req.user._id } }
    );
    return res.send({
      success: 1,
      message: "You have read the notifications",
    });
  } catch (error) {
    return res.send({
      success: 0,
      message: error.message,
    });
  }
};
