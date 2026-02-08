import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(request) {
    try {
        const userId = getUserFromRequest(request);

        if (!userId) {
            return NextResponse.json({ data: null });
        }

        await dbConnect();
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return NextResponse.json({ data: null });
        }

        return NextResponse.json({
            data: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
        });
    } catch (error) {
        console.error("Get user error:", error);
        return NextResponse.json({ data: null });
    }
}
