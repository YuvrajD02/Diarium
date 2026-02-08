import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { generateToken } from "@/lib/auth";

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required." },
                { status: 400 }
            );
        }

        await dbConnect();

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "Invalid email or password." },
                { status: 401 }
            );
        }

        // Check password
        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            return NextResponse.json(
                { error: "Invalid email or password." },
                { status: 401 }
            );
        }

        // Generate token
        const token = generateToken(user._id.toString());

        // Create response with cookie
        const response = NextResponse.json({
            data: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Failed to login." },
            { status: 500 }
        );
    }
}
