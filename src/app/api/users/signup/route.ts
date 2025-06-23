import { dbConnection } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/utils/mailer";

// Connect with DB
dbConnection();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        console.log("reqBody is: ", reqBody);

        const { username, email, password } = reqBody;

        // Check if user already created or not on this email
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Generate the hash pwd of the user's original pwd
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashPassword
        })
        const savedUser = await newUser.save();
        console.log(" is: ", savedUser);

        // Send Verification email
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

        // Return the response
        return NextResponse.json({
            success: true,
            message: "User register Successfully",
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
} 
