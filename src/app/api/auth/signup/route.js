import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { generateToken } from "@/lib/auth";

export async function POST(request) {
    try {
        const { email, password, name } = await request.json();

        if (!email || !password || !name) {
            return NextResponse.json(
                { error: "All fields are required." },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: "Password must be at least 6 characters." },
                { status: 400 }
            );
        }

        await dbConnect();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "Email already registered." },
                { status: 409 }
            );
        }

        // Create new user
        const user = await User.create({ email, password, name });

        // Generate token
        const token = generateToken(user._id.toString());

        // Create response with cookie
        const response = NextResponse.json(
            {
                data: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                },
            },
            { status: 201 }
        );

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return response;
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { error: "Failed to create account." },
            { status: 500 }
        );
    }
}
