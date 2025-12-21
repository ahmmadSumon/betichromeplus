"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Collection {
  _id: string;
  name: string;
  image: string;
  productCount: number; // ✅ ADD THIS
}

export function CollectionTable() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCollections = async () => {
    setLoading(true);
    const res = await fetch("/api/collections");
    const data = await res.json();
    setCollections(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this collection?")) return;

    const res = await fetch(`/api/collections/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    fetchCollections();
  };

  if (loading) {
    return (
      <p className="text-sm text-muted-foreground">
        Loading collections...
      </p>
    );
  }

  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Collections</h2>
      </div>

      {collections.length === 0 ? (
        <p className="p-4 text-sm text-muted-foreground">
          No collections added yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Products</th> 
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {collections.map((item) => (
                <tr
                  key={item._id}
                  className="border-t hover:bg-muted/50 transition"
                >
                  <td className="p-3">
                    <div className="relative h-14 w-14 rounded-md overflow-hidden border">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>

                  <td className="p-3 font-medium">{item.name}</td>

                  {/* ✅ PRODUCT COUNT */}
                  <td className="p-3">
                    <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                      {item.productCount}
                    </span>
                  </td>

                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
