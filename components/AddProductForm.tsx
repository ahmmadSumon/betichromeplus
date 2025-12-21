"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface Collection {
  _id: string;
  name: string;
}

interface AddProductFormProps {
  onSuccess?: () => void;
  product?: any;
}

export const AddProductForm: React.FC<AddProductFormProps> = ({
  onSuccess,
  product,
}) => {
  const [loading, setLoading] = useState(false);

  const [allCollections, setAllCollections] = useState<Collection[]>([]);
  const [collections, setCollections] = useState<string[]>([]);

  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState("");

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  /* Fetch collections */
  useEffect(() => {
    fetch("/api/collections")
      .then((res) => res.json())
      .then(setAllCollections);
  }, []);

  /* Load product for edit */
  useEffect(() => {
    if (product) {
      setCollections(product.collections?.map((c: any) => c._id || c) || []);
      setSizes(product.sizes || []);
      setColors(product.colors || []);
      setTags(product.tags || []);
      setCategory(product.category || "");
      setPreviewImages(product.images || []);
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    let imageUrls: string[] = [...(product?.images || [])];

    if (imageFiles.length > 0) {
      imageUrls = [];
      for (const file of imageFiles) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await res.json();
        imageUrls.push(data.url);
      }
    }

    const productData = {
      title: formData.get("title")?.toString(),
      description: formData.get("description")?.toString(),
      price: Number(formData.get("price")),
      quantity: Number(formData.get("quantity")),
      category,
      collections,
      sizes,
      colors,
      tags,
      images: imageUrls,
    };

    try {
      const res = await fetch(
        product ? `/api/products/${product._id}` : "/api/products",
        {
          method: product ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        }
      );

      if (!res.ok) throw new Error("Save failed");

      toast.success(product ? "Product updated" : "Product added");
      onSuccess?.();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl space-y-4">
      <h2 className="text-xl font-semibold">
        {product ? "Edit Product" : "Add Product"}
      </h2>

      <input
        name="title"
        defaultValue={product?.title}
        required
        placeholder="Title"
        className="border p-3 rounded w-full"
      />

      <textarea
        name="description"
        defaultValue={product?.description}
        placeholder="Description"
        className="border p-3 rounded w-full"
      />

      {/* CATEGORY */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-3 rounded w-full"
      >
        <option value="">Select Category</option>
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="Kids">Kids</option>
         <option value="Winter">Winter</option>
      </select>

      {/* COLLECTIONS */}
      <div>
        <p className="font-medium mb-2">Collections</p>
        <div className="grid grid-cols-2 gap-2">
          {allCollections.map((c) => (
            <label key={c._id} className="flex gap-2 items-center border p-2 rounded">
              <input
                type="checkbox"
                checked={collections.includes(c._id)}
                onChange={(e) =>
                  setCollections((prev) =>
                    e.target.checked
                      ? [...prev, c._id]
                      : prev.filter((id) => id !== c._id)
                  )
                }
              />
              {c.name}
            </label>
          ))}
        </div>
      </div>

      <input type="number" name="price" defaultValue={product?.price} placeholder="Price" className="border p-3 rounded" />
      <input type="number" name="quantity" defaultValue={product?.quantity} placeholder="Quantity" className="border p-3 rounded" />

      <input
        type="file"
        multiple
        onChange={(e) => {
          if (e.target.files) {
            const files = Array.from(e.target.files);
            setImageFiles(files);
            setPreviewImages(files.map((f) => URL.createObjectURL(f)));
          }
        }}
      />

      <button className="bg-black text-white p-3 rounded w-full">
        {loading ? "Saving..." : "Save Product"}
      </button>
    </form>
  );
};
