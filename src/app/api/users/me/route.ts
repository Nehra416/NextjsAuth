import { dbConnection } from "@/config/dbConfig";
import User from "@/models/userModel";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";


dbConnection();

export async function POST(request: NextRequest) {
    try {
        // Get userId from token 
        const userId = await getDataFromToken(request);

        // Check that user found or not
        const user = await User.findOne({ _id: userId }).select("-password");
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "User fetched",
            data: user
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}