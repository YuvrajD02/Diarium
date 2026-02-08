"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function CreatePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [text, setText] = useState("");
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!text.trim()) {
      setError("Please write what you did today.");
      return;
    }

    if (!media) {
      setError("Please upload one image or video.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("text", text);
      formData.append("media", media);

      const res = await fetch("/api/works", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save entry.");
      }

      router.push("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-zinc-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-zinc-900">
            Create Today&apos;s Work
          </h1>
          <Link
            href="/"
            className="text-sm font-medium text-zinc-500 hover:text-zinc-900"
          >
            Back to log
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-zinc-700">
              What I did today
            </label>
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              rows={6}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-800 outline-none focus:border-zinc-400 focus:bg-white"
              placeholder="Summarize your work..."
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-zinc-700">
              Upload one image or video
            </label>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(event) => setMedia(event.target.files?.[0] || null)}
              className="block w-full text-sm text-zinc-600 file:mr-4 file:rounded-full file:border-0 file:bg-black file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-zinc-800"
            />
            {media && (
              <p className="text-xs text-zinc-500">Selected: {media.name}</p>
            )}
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-full bg-black px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
          >
            {loading ? "Saving..." : "Save Entry"}
          </button>
        </form>
      </main>
    </div>
  );
}
