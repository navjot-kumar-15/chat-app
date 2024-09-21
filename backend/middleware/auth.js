import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'


export const protectAuth = async (req,res,next) => {
    try {
        let token;
        if(req.headers.token) {
            token = req.headers.token;
            const decode = await jwt.verify(token,process.env.SECRET_KEY);
            req.user = await User.findOne({_id:decode.id});
            next()
        }else{
            return res.send({
                success:0,
                message:"Unauthorized"
            })
        }
    } catch (error) {
        return res.send({
            success:0,
            message:error.message
        })
    }
}