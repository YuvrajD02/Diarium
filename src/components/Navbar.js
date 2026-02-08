"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-zinc-100 sticky top-0 z-50">
            <div className="mx-auto max-w-7xl px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold text-zinc-900">
                        Diarium
                    </Link>

                    {/* Center Navigation Links */}
                    <div className="hidden md:flex gap-8">
                        <Link href="/" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition">
                            Home
                        </Link>
                        <a href="#features" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition">
                            Features
                        </a>
                        <a href="#about" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition">
                            About
                        </a>
                        <a href="#contact" className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition">
                            Contact
                        </a>
                    </div>

                    {/* Right Side - User Menu or Login */}
                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-zinc-600">Welcome, {user.name}</span>
                                <button
                                    onClick={handleLogout}
                                    className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
