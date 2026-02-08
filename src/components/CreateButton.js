import Link from "next/link";

export default function CreateButton() {
  return (
    <Link
      href="/create"
      className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800"
    >
      Create Today's Work
    </Link>
  );
}
