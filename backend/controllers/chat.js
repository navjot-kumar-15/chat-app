import Chat from '../models/chatModel.js'
import User from '../models/userModel.js';


// Access single Chat 
export const singleChat = async (req,res) => {
    try {
        const {userId} = req.query
        if(!userId) {
            return res.send({
                success:0,
                message:"Please provide userId"
            })
        }

            let isChat  = await Chat.find({
                isGroupChat: false,
                $and:[
                    {users:{$elemMatch:{$eq:req.user._id}}},
                    {users:{$elemMatch:{$eq:userId}}}
                ]
            }).populate("users","-password").populate("latestMessage");
            // return res.send(isChat)

            isChat = await User.populate(isChat,{
                path:"latestMessage.sender",
                select:"name pic email"
            })

            if(isChat && isChat.length > 0 ) {
                return res.send({
                    success:1,
                    message:"Chat fetched successfully",
                    details:isChat[0]
                })
            }else{
                let chatData = {
                    chatName:"sender",
                    isGroupChat:false,
                    users:[req.user._id,userId]
                }
                const createChat = await Chat.create(chatData)
                const fullChat = await Chat.findOne({_id:createChat._id}).populate("users","-password")
                return res.send({
                    success:1,
                    message:"Chat created successfully",
                    details:fullChat
                })
            }
    } catch (error) {
        return res.send({
            success:0,
            message:error.message
        })
    }
}

export const getUserChats = async (req,res) => {
    try {
        const userChats = await Chat.find({users:{$elemMatch:{$eq:req.user._id}}}).populate("users","-password").populate("groupAdmin","-password").populate("latestMessage").sort({updateAt:-1});
        if(!userChats) {
            return res.send({
                success:0,
                message:"No chats found"
            })
        }
        return res.send({
            success:1,
            message:"Chats fetched successfully",
            details:userChats
        })
    } catch (error) {
        return res.send({
            success:0,
            message:error.message
        })
    }
}