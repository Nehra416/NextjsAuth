import { dbConnection } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

dbConnection();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log("Token is: ", token);

        const user = await User.findOne({
            userVerifyToken: token,
            userVerifyTokenExpiry: { $gt: Date.now() }
        })

        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 404 });
        }

        user.isVarified = true;
        user.userVerifyToken = undefined;
        user.userVerifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({
            success: true,
            message: "Email verified Successfully",
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}