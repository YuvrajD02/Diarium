import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Work from "@/models/Work";
import { getUserFromRequest } from "@/lib/auth";

export async function DELETE(request, { params }) {
    const userId = getUserFromRequest(request);

    if (!userId) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        await dbConnect();

        const entry = await Work.findById(params.id);

        if (!entry) {
            return NextResponse.json(
                { error: "Entry not found" },
                { status: 404 }
            );
        }

        // Verify the entry belongs to the user
        if (entry.userId.toString() !== userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 403 }
            );
        }

        await Work.findByIdAndDelete(params.id);

        return NextResponse.json({ message: "Entry deleted successfully" });
    } catch (error) {
        console.error("Error deleting work entry:", error);
        return NextResponse.json(
            { error: error.message || "Failed to delete work entry" },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    const userId = getUserFromRequest(request);

    if (!userId) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const body = await request.json();
        const { text } = body;

        if (!text || !text.trim()) {
            return NextResponse.json(
                { error: "Text is required" },
                { status: 400 }
            );
        }

        await dbConnect();

        const entry = await Work.findById(params.id);

        if (!entry) {
            return NextResponse.json(
                { error: "Entry not found" },
                { status: 404 }
            );
        }

        // Verify the entry belongs to the user
        if (entry.userId.toString() !== userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 403 }
            );
        }

        const updatedEntry = await Work.findByIdAndUpdate(
            params.id,
            { text: text.trim() },
            { new: true }
        );

        return NextResponse.json({ data: updatedEntry });
    } catch (error) {
        console.error("Error updating work entry:", error);
        return NextResponse.json(
            { error: error.message || "Failed to update work entry" },
            { status: 500 }
        );
    }
}
