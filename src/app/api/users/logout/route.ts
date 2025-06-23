import { dbConnection } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";

dbConnection();

export async function GET(request: NextRequest) {
    try {
        const response = NextResponse.json({
            message: "Logout Successfully",
            success: true
        }, { status: 200 });

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0) // expire immidiate
        })

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}