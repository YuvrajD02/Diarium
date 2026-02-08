import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this-in-production";

export function generateToken(userId) {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}

export function getUserFromRequest(request) {
    const token = request.cookies.get("token")?.value;
    if (!token) return null;

    const decoded = verifyToken(token);
    return decoded?.userId || null;
}
