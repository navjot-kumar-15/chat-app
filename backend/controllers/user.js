import User from "../models/userModel.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


function generateToken(id) {
    return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '1h' });
}

// Register user 
export const registerUser = async (req,res) => {
    try {
        const {name,email,password} = req.body
       
        if(!name || !email || !password) {
            return res.send({
                success:0,
                message:"Please enter all the required fields"
            })
        }
        const isCheck = await User.findOne({email});
        if(isCheck) {
            return res.send({
                success:0,
                message:"Invalid credentials",
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password,salt);

        // New user 
        const newUser = await User.create({
            name,email,pic:req.file && `/avatar/${req.file.filename}`,password:hashPass
        });

        return res.send({
            success:1,
            message:"You have registered successfully"
        })
    } catch (error) {
        return res.send({
            success:0,
            message:error.message
        })
    }
}


// Login user 
export const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body
        if(!email || !password) {
            return res.send({
                success:0,
                message:"Invalid credentials"
            })
        }

        const checkUser = await User.findOne({email});
        if(!checkUser) {
            return res.send({
                success:0,
                message:"Invalid credentials"
            })
        }

        if(checkUser && (await bcrypt.compare(password,checkUser.password))) {
            return res.send({
                success:1,
                message:"You have logged in successfully",
                details:{token:generateToken(checkUser._id)}
            })
        }
        return res.send({
            success:0,
            message: "Invalid credentials"
        })
    } catch (error) {
        return res.send({
            success:0,
            message:error.message
        })
    }
}


// Get single user 
export const getSingleUser = async (req,res) => {
    try {
        return res.send({
            success:1,
            message:"User fetched successfully",
            details:req.user
        })
    } catch (error) {
        return res.send({
            success:0,
            message:error.message
        }) 
    }
}

// Search user 
export const searchUser = async (req,res) => {
    try {
        const {q} = req.query;
        if(!q) {
            return res.send({
                success:0,
                message:"Please enter some value to search"
            })
        }
        const regex = new RegExp(q,"i")
        const users = await User.find({
            $and:[
                {_id:{$ne:req.user._id}},
              {  $or:[
                    {name:{$regex:regex}},
                    {email:{$regex:regex}}
                ]}
            ]
       
        })

        return res.send({
            success:1,
            message:"User fetched successfully",
            details:users
        })
    } catch (error) {
        return res.send({
            success:0,
            message:error.message
        })
    }
}