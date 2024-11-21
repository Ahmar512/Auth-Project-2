import { transporter} from "./mail.config.js";
import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE} from "./mailTamplates.js";

export const verificationEmail = async (email, verificationToken) =>{
    
    try {
        const info = await transporter.sendMail({
            from: "Ahmar Ansari", // sender address
            to: email, // list of receivers
            subject: "Verification", // Subject line
            text: "Verify Your Email", // plain text body
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken), // html body
          });
        
          console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.log("Error in sending verification email", error.message);
        throw new Error("Error in sending verification email", error.message);
        
    }
}

export const sendWelcomeEmail = async (email, name) =>{

    try {
        const info = await transporter.sendMail({
            from: "Ahmar Ansari", // sender address
            to: email, // list of receivers
            subject: "Welcome", // Subject line
            text: "Welcome", // plain text body
            html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name), // html body
          });
        
          console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.log("Error in sending welcome email", error.message);
        throw new Error("Error in sending welcome email", error.message);
        
    }

}
export const sendResetPasswordLink = async (email, resetUrl) =>{
    try {
        const info = await transporter.sendMail({
            from: "Ahmar Ansari", // sender address
            to: email, // list of receivers
            subject: "Reset Password", // Subject line
            text: "Reset Password", // plain text body
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl), // html body
          });
        
          console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.log("Error in sending reset password email", error.message);
        throw new Error("Error in sending reset password email", error.message);
        
    }
}
export const sendResetSuccessEmail = async (email) =>{
    try {
        const info = await transporter.sendMail({
            from: "Ahmar Ansari", // sender address
            to: email, // list of receivers
            subject: "Reset Password Successfull", // Subject line
            text: "Reset Password Successful", // plain text body
            html: PASSWORD_RESET_SUCCESS_TEMPLATE, // html body
          });
        
          console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.log("Error in sending reset password success email", error.message);
        throw new Error("Error in sending reset password success email", error.message);
        
    }
}