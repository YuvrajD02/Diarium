"use client";

import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LandingPage from "@/components/LandingPage";

export default function LayoutClient({ children }) {
    const { user, loading } = useAuth();
    const pathname = usePathname();

    // Check if we're on auth pages
    const isAuthPage = pathname === "/login" || pathname === "/signup";

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <p className="text-zinc-500">Loading...</p>
            </div>
        );
    }

    // Show auth pages without landing page interference
    if (isAuthPage) {
        return <>{children}</>;
    }

    // Show landing page for non-authenticated users on home page
    if (!user) {
        return (
            <>
                <Navbar />
                <LandingPage />
                <Footer />
            </>
        )
    }

    // Show app for authenticated users
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-zinc-50">{children}</main>
            <Footer />
        </>
    );
}
