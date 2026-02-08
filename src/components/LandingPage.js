"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function LandingPage() {
    const { user } = useAuth();

    if (user) return null; // Don't show landing page if logged in

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center px-6 pt-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
                        Capture Your <span className="text-sky-500">Daily</span> Achievements
                    </h1>
                    <p className="text-xl text-zinc-600 mb-8 max-w-2xl mx-auto">
                        Diarium is your personal diary app where you can document your daily work,
                        share your accomplishments, and build a portfolio of your achievements with photos and videos.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/signup"
                            className="rounded-lg bg-sky-500 px-8 py-3 text-lg font-medium text-white hover:bg-sky-600 transition"
                        >
                            Get Started Free
                        </Link>
                        <Link
                            href="/login"
                            className="rounded-lg border-2 border-black bg-white px-8 py-3 text-lg font-medium text-black hover:bg-zinc-50 transition"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-6 bg-zinc-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-black text-center mb-12">
                        Why Choose <span className="text-sky-500">Diarium?</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="rounded-2xl border-2 border-zinc-200 p-8 bg-white hover:shadow-lg hover:border-sky-500 transition">
                            <div className="w-12 h-12 rounded-lg bg-sky-500 flex items-center justify-center mb-4">
                                <span className="text-2xl">📸</span>
                            </div>
                            <h3 className="text-xl font-semibold text-black mb-3">
                                Rich Media Support
                            </h3>
                            <p className="text-zinc-600">
                                Upload photos and videos to document your daily work. Make your diary entries more engaging and memorable.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="rounded-2xl border-2 border-zinc-200 p-8 bg-white hover:shadow-lg hover:border-sky-500 transition">
                            <div className="w-12 h-12 rounded-lg bg-sky-500 flex items-center justify-center mb-4">
                                <span className="text-2xl">📝</span>
                            </div>
                            <h3 className="text-xl font-semibold text-black mb-3">
                                Easy to Edit
                            </h3>
                            <p className="text-zinc-600">
                                Easily edit your entries anytime. Update your descriptions or change your thoughts whenever you want.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="rounded-2xl border-2 border-zinc-200 p-8 bg-white hover:shadow-lg hover:border-sky-500 transition">
                            <div className="w-12 h-12 rounded-lg bg-sky-500 flex items-center justify-center mb-4">
                                <span className="text-2xl">🎯</span>
                            </div>
                            <h3 className="text-xl font-semibold text-black mb-3">
                                Multiple Entries
                            </h3>
                            <p className="text-zinc-600">
                                Create multiple work entries per day. Track different projects and activities throughout your day.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="rounded-2xl border-2 border-zinc-200 p-8 bg-white hover:shadow-lg hover:border-sky-500 transition">
                            <div className="w-12 h-12 rounded-lg bg-sky-500 flex items-center justify-center mb-4">
                                <span className="text-2xl">🔒</span>
                            </div>
                            <h3 className="text-xl font-semibold text-black mb-3">
                                Secure & Private
                            </h3>
                            <p className="text-zinc-600">
                                Your diary entries are private and secure. Only you can access your personal achievements and memories.
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="rounded-2xl border-2 border-zinc-200 p-8 bg-white hover:shadow-lg hover:border-sky-500 transition">
                            <div className="w-12 h-12 rounded-lg bg-sky-500 flex items-center justify-center mb-4">
                                <span className="text-2xl">⚡</span>
                            </div>
                            <h3 className="text-xl font-semibold text-black mb-3">
                                Lightning Fast
                            </h3>
                            <p className="text-zinc-600">
                                Built with modern technology for speed and reliability. Enjoy a smooth experience across all devices.
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="rounded-2xl border-2 border-zinc-200 p-8 bg-white hover:shadow-lg hover:border-sky-500 transition">
                            <div className="w-12 h-12 rounded-lg bg-sky-500 flex items-center justify-center mb-4">
                                <span className="text-2xl">📱</span>
                            </div>
                            <h3 className="text-xl font-semibold text-black mb-3">
                                Responsive Design
                            </h3>
                            <p className="text-zinc-600">
                                Access your diary from any device. Whether desktop, tablet, or mobile, your entries are always accessible.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-black text-center mb-12">
                        About <span className="text-sky-500">Diarium</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="text-lg text-zinc-600 mb-6">
                                Diarium was created with a simple mission: to help professionals document and celebrate their daily achievements.
                            </p>
                            <p className="text-lg text-zinc-600 mb-6">
                                In today's fast-paced world, it's easy to forget what you've accomplished. Diarium provides a beautiful,
                                intuitive platform to capture your work, your progress, and your growth.
                            </p>
                            <p className="text-lg text-zinc-600">
                                Whether you're a freelancer, entrepreneur, or employee, Diarium helps you build a comprehensive record of
                                your achievements that you can share with pride.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-sky-100 to-sky-50 rounded-2xl border-2 border-sky-200 p-12 text-center">
                            <div className="text-6xl mb-4">🎯</div>
                            <h3 className="text-2xl font-bold text-black mb-4">Our Mission</h3>
                            <p className="text-zinc-600">
                                To empower individuals to recognize and celebrate their daily achievements through simple, beautiful documentation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 px-6 bg-zinc-50">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-4xl font-bold text-black text-center mb-12">
                        Get in <span className="text-sky-500">Touch</span>
                    </h2>
                    <div className="rounded-2xl border-2 border-zinc-200 p-8 bg-white">
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    className="w-full rounded-lg border-2 border-zinc-200 bg-white px-4 py-2 text-zinc-900 placeholder-zinc-500 outline-none focus:border-sky-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full rounded-lg border-2 border-zinc-200 bg-white px-4 py-2 text-zinc-900 placeholder-zinc-500 outline-none focus:border-sky-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-black mb-2">
                                    Message
                                </label>
                                <textarea
                                    rows={5}
                                    placeholder="Your message..."
                                    className="w-full rounded-lg border-2 border-zinc-200 bg-white px-4 py-2 text-zinc-900 placeholder-zinc-500 outline-none focus:border-sky-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full rounded-lg bg-sky-500 px-4 py-3 text-sm font-medium text-white hover:bg-sky-600 transition"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="mt-12 text-center">
                        <h3 className="text-xl font-semibold text-black mb-6">
                             Reach us directly
                        </h3>
                        <div className="flex flex-col sm:flex-row gap-8 justify-center">
                            <div>
                                <p className="text-sm text-zinc-600 mb-2">Email</p>
                                <a href="mailto:support@diarium.com" className="text-lg font-medium text-sky-500 hover:text-sky-600">
                                    aman15cs21@gmail.com
                                </a>
                            </div>
                            <div>
                                <p className="text-sm text-zinc-600 mb-2">Phone</p>
                                <a href="tel:+1234567890" className="text-lg font-medium text-sky-500 hover:text-sky-600">
                                   +91 7260xxxxxx
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            {/* <section className="py-20 px-6 bg-gradient-to-r from-black to-zinc-900">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Ready to Start Your <span className="text-sky-400">Journal?</span>
                    </h2>
                    <p className="text-xl text-zinc-300 mb-8">
                        Join thousands of professionals documenting their daily achievements.
                    </p>
                    <Link
                        href="/signup"
                        className="inline-block rounded-lg bg-sky-500 px-8 py-3 text-lg font-medium text-white hover:bg-sky-600 transition"
                    >
                        Create Free Account
                    </Link>
                </div>
            </section> */}
        </div>
    );
}
