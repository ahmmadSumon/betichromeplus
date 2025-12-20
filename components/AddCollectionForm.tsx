"use client";

import { useState } from "react";

export default function AddCollectionForm() {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = "";

    if (image) {
      const fd = new FormData();
      fd.append("file", image);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      imageUrl = data.url;
    }

    await fetch("/api/collections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, image: imageUrl }),
    });

    setName("");
    setImage(null);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow space-y-4 max-w-xl"
    >
      <h2 className="text-xl font-semibold">Add Collection</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Collection Name"
        className="w-full border p-3 rounded-md"
        required
      />

      <input
        type="file"
        onChange={(e) => e.target.files && setImage(e.target.files[0])}
        className="w-full border p-2 rounded-md"
        required
      />

      <button
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded-md"
      >
        {loading ? "Saving..." : "Add Collection"}
      </button>
    </form>
  );
}
