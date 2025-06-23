import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { generateHtmlForEmail } from "./generateHtmlForEmail";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // Create a hashToken to help in verify the user 
        const hashToken = await bcrypt.hash(userId.toString(), 10);

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                userVerifyToken: hashToken,
                userVerifyTokenExpiry: Date.now() + 3600000 // expire in 1hr (3600000ms)
            })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgetPasswordToken: hashToken,
                forgetPasswordTokenExpiry: Date.now() + 3600000
            })
        }

        // Dummy OR for development from the mailtrap.io
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        });

        // Get the dynamic html content acc to the emailType
        const htmlContent = generateHtmlForEmail({
            emailType,
            token: hashToken,
        });

        const mailOptions = {
            from: `nehra@xyz.com`, // Fake email for now
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            text: `Please go to this link: ${htmlContent}`, // fallback
            html: htmlContent
        }

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}