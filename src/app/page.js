"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import CreateButton from "@/components/CreateButton";
import WorkCard from "@/components/WorkCard";

export default function Home() {
  const { user, loading: authLoading } = useAuth();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingEntry, setEditingEntry] = useState(null);
  const [editText, setEditText] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!user) return;

    let active = true;

    async function loadEntries() {
      try {
        setLoading(true);
        const res = await fetch("/api/works");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load entries.");
        if (active) setEntries(data.data || []);
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadEntries();
    return () => {
      active = false;
    };
  }, [user]);

  const handleDelete = (entryId) => {
    setEntries(entries.filter(e => e._id !== entryId));
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setEditText(entry.text);
  };

  const handleSaveEdit = async () => {
    if (!editText.trim()) {
      alert("Text cannot be empty");
      return;
    }

    try {
      setIsSaving(true);
      const res = await fetch(`/api/works/${editingEntry._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: editText }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update entry");
      }

      const updatedEntry = await res.json();
      setEntries(entries.map(e => e._id === editingEntry._id ? updatedEntry.data : e));
      setEditingEntry(null);
      setEditText("");
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-zinc-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-zinc-600">Welcome back,</p>
          <h1 className="text-3xl font-bold text-zinc-900">{user.name}</h1>
        </div>

        {/* Create Entry Section */}
        <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-semibold text-zinc-900">Diarium</h2>
          <p className="text-sm text-zinc-600">Capture and share your daily achievements.</p>
          <div className="pt-2">
            <CreateButton />
          </div>
        </div>

        {/* Loading & Error States */}
        {loading && <p className="text-sm text-zinc-500 text-center py-8">Loading entries...</p>}
        {error && <p className="text-sm text-red-600 text-center py-8">{error}</p>}

        {/* Empty State */}
        {!loading && !error && entries.length === 0 && (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-10 text-center text-sm text-zinc-500">
            No entries yet. Create your first work log for today.
          </div>
        )}

        {/* Entries Grid */}
        {!loading && entries.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entries.map((entry) => (
              <WorkCard
                key={entry._id}
                entry={entry}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-zinc-900 mb-4">Edit Entry</h3>
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              rows={6}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-800 outline-none focus:border-zinc-400 focus:bg-white mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setEditingEntry(null);
                  setEditText("");
                }}
                className="flex-1 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={isSaving}
                className="flex-1 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
