import bcryptjs from 'bcryptjs'
import crypto from 'crypto'

import { User } from '../model/user.model.js'
import { generateTokenAndCookie } from '../utils/generateToken&Cookie.js';
import { sendResetPasswordLink, sendResetSuccessEmail, sendWelcomeEmail, verificationEmail } from '../nodemailer/mail.js';


export const signup = async (req, res) =>{
    const {name ,email, password} = req.body;
    console.log({name, email, password});
    try {
        if(!email || !name || !password){
            throw new Error("All fields requires");
        }
        const userAlreadyExist = await User.findOne({email});
        if(userAlreadyExist){
            return res.status(400).json({success: false ,message:"User already exists"});
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000+Math.random()*900000).toString();
        const user = new User({
            email,
            password:hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        })

        await user.save();

        //JWT
        generateTokenAndCookie(res, user._id);

        await verificationEmail(user.email, verificationToken);
        

        res.status(201).json({
            success: true,
            message:"User created successfully",
            user:{
                ...user._doc,
                password: undefined,
            }
        })
    } catch (error) {
        res.status(400).json({success:false, message:error.message});
    }
}

export const verifyEmail = async (req, res) =>{
    const {code} = req.body;
    try {
        const user = await User.findOne({
            verificationToken:code,
            verificationTokenExpiresAt: {$gt: Date.now()}
        });
        if(!user){
            return res.status(400).json({success:false, message:"Invalid or expired verification code"});
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        await user.save();

        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({
            success: true,
            message: "User verified successfully",
            user:{
                ...user._doc,
                password:undefined,
            },
        })
    } catch (error) {
        
    }
}

export const login = async (req, res) =>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false, message:"Invalid credentials"});
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({success:false, message:"Invalid credentials"});
        }

        generateTokenAndCookie(res, user._id);
        user.lastLogin = new Date();
        await user.save();
        res.status(200).json({
            success:true,
            message:'User login successfully',
            user:{
                ...user._doc,
                password:undefined,
            }
        })
    } catch (error) {
        console.log("Error in login", error.message);
        res.status(400).json({success:false, message:error.message});
        
    }
}
export const logout = async (req, res) =>{
    res.clearCookie("token");
    res.status(200).json({success:true, message:"Logout successfully"});
}
export const forgotPassword = async (req, res) =>{
    const {email} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false, message:"User not found"});
        }
        const resetPasswordToken = crypto.randomBytes(20).toString("hex");
        const resetPasswordExpiresAt = Date.now()+1*60*60*1000;

        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordExpiresAt = resetPasswordExpiresAt;

        await user.save();

        await sendResetPasswordLink(user.email, `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`);

        res.status(200).json({
            success:true,
            message:"password reset link send successfully",
            user:{
                ...user._doc,
                password:undefined,
            }
        });

    } catch (error) {
        console.log("Error in forgot password", error);
        res.status(400).json({success:false, message:error.message});
    }
}
export const resetPassword = async (req, res) =>{
    const {token} = req.params;
    const {password} = req.body;
    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: {$gt: Date.now()}
        });
        if(!user){
            return res.status(400).json({success:false, message:"Invalid or reset token expired"});
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;

        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({
            success:true,
            message:"reset password successfull",
            user:{
                ...user._doc,
                password: undefined,
            }
        })
    } catch (error) {
        console.log("Error in resetting password", error);
        res.status(400).json({success:false, message: error.message});
        
        
    }

}
export const checkAuth = async (req, res) =>{
    
    try {
        const user = await User.findById(req.userId).select("-password");

        if(!user) return res.status(400).json({success:false, message:"User not found"});

        res.status(200).json({success:true, user})

    } catch (error) {
        console.log("error in checking auth", error);
        res.status(400).json({success:false, message:error.messsage});
    }
}