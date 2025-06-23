import { dbConnection } from "@/config/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

dbConnection();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        console.log("reqBody is: ", reqBody);
        const { email, password } = reqBody;

        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ error: "User does't exist on this email" }, { status: 404 });
        }

        const isPwdTrue = await bcrypt.compare(password, user.password);
        if (!isPwdTrue) {
            return NextResponse.json({ error: "Password is not correct" }, { status: 400 });
        }

        const tokenPayload = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        const token = await jwt.sign(tokenPayload, process.env.TOKEN_SECRET!, { expiresIn: '7d' });


        const response = NextResponse.json({
            success: true,
            message: "Login Successfully",
        }, { status: 200 });

        response.cookies.set("token", token, {
            httpOnly: true
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}