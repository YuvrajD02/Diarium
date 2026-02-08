import { useState } from "react";

export default function WorkCard({ entry, onDelete, onEdit }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const date = entry?.date ? new Date(entry.date) : null;
  const dateLabel = date
    ? date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
    : "Unknown date";

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this entry?")) return;

    try {
      setIsDeleting(true);
      const res = await fetch(`/api/works/${entry._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete entry");
      }

      onDelete(entry._id);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <article className="flex flex-col rounded-2xl border border-zinc-200 bg-white shadow-sm overflow-hidden h-full">
      <div className="flex flex-col gap-4 p-6 flex-grow">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {dateLabel}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(entry)}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
              title="Edit entry"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Delete entry"
            >
              {isDeleting ? "..." : "Delete"}
            </button>
          </div>
        </div>

        <p className="text-base leading-7 text-zinc-800 whitespace-pre-wrap flex-grow">
          {entry?.text}
        </p>
      </div>

      <div className="overflow-hidden rounded-t-xl border-t border-zinc-200 bg-zinc-50 h-48">
        {entry?.mediaType === "video" ? (
          <video
            className="h-full w-full object-cover"
            controls
            preload="metadata"
            src={entry?.mediaUrl}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={entry?.mediaUrl}
            alt="Work media"
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </article>
  );
}
