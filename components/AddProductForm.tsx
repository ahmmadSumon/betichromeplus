"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface AddProductFormProps {
  onSuccess?: () => void;
  product?: any;
}

export const AddProductForm: React.FC<AddProductFormProps> = ({
  onSuccess,
  product,
}) => {
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [collections, setCollections] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("");

  /* 🔁 LOAD DATA WHEN EDITING */
  useEffect(() => {
    if (product) {
      setPreviewImages(product.images || []);
      setCollections(product.collections || []);
      setSizes(product.sizes || []);
      setColors(product.colors || []);
      setTags(product.tags || []);
      setCategory(product.category || "");
    }
  }, [product]);

  const handleAddItem = (
    value: string,
    state: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const trimmed = value.trim();
    if (trimmed && !state.includes(trimmed)) {
      setter((prev) => [...prev, trimmed]);
    }
  };

  const handleRemoveItem = (
    index: number,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveImage = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    let imageUrls: string[] = [...(product?.images || [])];

// If new images selected → upload & replace
if (imageFiles.length > 0) {
  imageUrls = [];

  for (const file of imageFiles) {
    const uploadData = new FormData();
    uploadData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: uploadData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error("Image upload failed");
    }

    imageUrls.push(data.url);
  }
}


 const productData = {
  title: formData.get("title")?.toString() || "",
  description: formData.get("description")?.toString() || "",
  category,
  collections,
  sizes,
  colors,
  tags,
  quantity: Number(formData.get("quantity") || 0),
  price: Number(formData.get("price") || 0),
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

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save product");
      }

      toast.success(product ? "Product updated successfully" : "Product added successfully");

      form.reset();
      setImageFiles([]);
      setPreviewImages([]);
      setCollections([]);
      setSizes([]);
      setColors([]);
      setTags([]);
      setCategory("");

      onSuccess?.();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const DynamicInput = ({
    items,
    setItems,
    placeholder,
  }: {
    items: string[];
    setItems: React.Dispatch<React.SetStateAction<string[]>>;
    placeholder: string;
  }) => {
    const [input, setInput] = useState("");

    return (
      <div>
        <div className="flex flex-wrap gap-2 mb-2">
          {items.map((item, i) => (
            <span
              key={i}
              className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full flex items-center gap-1"
            >
              {item}
              <button
                type="button"
                onClick={() => handleRemoveItem(i, setItems)}
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddItem(input, items, setItems);
              setInput("");
            }
          }}
          placeholder={`Add ${placeholder} and press Enter`}
          className="border p-2 rounded w-full"
        />
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-xl p-6 space-y-4"
    >
      <h2 className="text-xl font-semibold">
        {product ? "Edit Product" : "Add New Product"}
      </h2>

      <input
        name="title"
        required
        defaultValue={product?.title}
        placeholder="Title"
        className="border p-3 rounded w-full"
      />

      <textarea
        name="description"
        defaultValue={product?.description}
        placeholder="Description"
        className="border p-3 rounded w-full h-24"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="border p-3 rounded w-full"
      >
        <option value="">Select Category</option>
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="Kids">Kids</option>
        <option value="Winter">Winter</option>
        <option value="Summer">Summer</option>
      </select>

      <DynamicInput items={collections} setItems={setCollections} placeholder="collection" />
      <DynamicInput items={sizes} setItems={setSizes} placeholder="size" />
      <DynamicInput items={colors} setItems={setColors} placeholder="color" />
      <DynamicInput items={tags} setItems={setTags} placeholder="tag" />

      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          name="quantity"
          defaultValue={product?.quantity}
          placeholder="Quantity"
          className="border p-3 rounded"
        />
        <input
          type="number"
          name="price"
          required
          defaultValue={product?.price}
          placeholder="Price"
          className="border p-3 rounded"
        />
      </div>

      {previewImages.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {previewImages.map((img, i) => (
            <div key={i} className="relative">
              <img
                src={img}
                className="h-20 w-20 object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(i)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => {
          if (e.target.files) {
            const files = Array.from(e.target.files);
            setImageFiles(files);
            setPreviewImages(files.map((f) => URL.createObjectURL(f)));
          }
        }}
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-600 text-white p-3 rounded w-full"
      >
        {loading ? "Saving..." : product ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};
