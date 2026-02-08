"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            setLoading(true);
            await login(email, password);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-zinc-900 mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-zinc-600">Sign in to your work log</p>
                </div>

                <div className="bg-white rounded-2xl border border-zinc-200 p-8 shadow-sm">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="email"
                                className="text-sm font-semibold text-zinc-700"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-800 outline-none focus:border-zinc-400 focus:bg-white"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="password"
                                className="text-sm font-semibold text-zinc-700"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-800 outline-none focus:border-zinc-400 focus:bg-white"
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-zinc-800 disabled:bg-zinc-400"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-zinc-600">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/signup"
                                className="font-semibold text-zinc-900 hover:underline"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
