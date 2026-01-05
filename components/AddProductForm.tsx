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

  /* ---------------- HELPERS ---------------- */
  const addItem = (
    value: string,
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (!value.trim()) return;
    if (list.includes(value)) return;
    setList([...list, value]);
  };

  const removeItem = (
    value: string,
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setList((prev) => prev.filter((v) => v !== value));
  };

  /* ---------------- FETCH COLLECTIONS ---------------- */
  useEffect(() => {
    fetch("/api/collections")
      .then((res) => res.json())
      .then(setAllCollections);
  }, []);

  /* ---------------- LOAD PRODUCT FOR EDIT ---------------- */
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

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    let imageUrls: string[] = [...(product?.images || [])];

    if (imageFiles.length > 0) {
      imageUrls = [];
      for (const file of imageFiles) {
        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`File ${file.name} is too large. Max size is 5MB.`);
          setLoading(false);
          return;
        }

        const fd = new FormData();
        fd.append("file", file);
        
        try {
          const res = await fetch("/api/upload", {
            method: "POST",
            body: fd,
          });
          
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || `Upload failed for ${file.name}`);
          }
          
          const data = await res.json();
          imageUrls.push(data.url);
        } catch (uploadError: any) {
          toast.error(`Image upload failed: ${uploadError.message}`);
          setLoading(false);
          return;
        }
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

  /* ---------------- UI ---------------- */
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl space-y-5">
      <h2 className="text-xl font-semibold">
        {product ? "Edit Product" : "Add Product"}
      </h2>

      {/* TITLE */}
      <input
        name="title"
        defaultValue={product?.title}
        required
        placeholder="Title"
        className="border p-3 rounded w-full"
      />

      {/* DESCRIPTION */}
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
            <label
              key={c._id}
              className="flex gap-2 items-center border p-2 rounded"
            >
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

      {/* PRICE & QUANTITY */}
      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          name="price"
          defaultValue={product?.price}
          placeholder="Price"
          className="border p-3 rounded"
        />
        <input
          type="number"
          name="quantity"
          defaultValue={product?.quantity}
          placeholder="Quantity"
          className="border p-3 rounded"
        />
      </div>

      {/* SIZES */}
      <div>
        <p className="font-medium mb-2">Sizes</p>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="S, M, L, XL"
            className="border p-2 rounded flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addItem(
                  (e.target as HTMLInputElement).value.toUpperCase(),
                  sizes,
                  setSizes
                );
                (e.target as HTMLInputElement).value = "";
              }
            }}
          />
          <button
            type="button"
            onClick={(e) => {
              const input = (e.target as HTMLButtonElement).previousElementSibling as HTMLInputElement;
              if (input.value.trim()) {
                addItem(input.value.toUpperCase(), sizes, setSizes);
                input.value = "";
              }
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <span
              key={size}
              className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
            >
              {size}
              <button
                type="button"
                onClick={() => removeItem(size, setSizes)}
                className="text-red-500 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* COLORS */}
      <div>
        <p className="font-medium mb-2">Colors</p>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Black, Red, Blue"
            className="border p-2 rounded flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addItem(
                  (e.target as HTMLInputElement).value,
                  colors,
                  setColors
                );
                (e.target as HTMLInputElement).value = "";
              }
            }}
          />
          <button
            type="button"
            onClick={(e) => {
              const input = (e.target as HTMLButtonElement).previousElementSibling as HTMLInputElement;
              if (input.value.trim()) {
                addItem(input.value, colors, setColors);
                input.value = "";
              }
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <span
              key={color}
              className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
            >
              {color}
              <button
                type="button"
                onClick={() => removeItem(color, setColors)}
                className="text-red-500 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* IMAGES */}
      <div>
        <p className="font-medium mb-2">Images (max 5MB each)</p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              const files = Array.from(e.target.files);
              
              // Validate file sizes
              const oversizedFiles = files.filter(f => f.size > 5 * 1024 * 1024);
              if (oversizedFiles.length > 0) {
                toast.error(`Files too large: ${oversizedFiles.map(f => f.name).join(', ')}. Max size is 5MB.`);
                return;
              }
              
              setImageFiles(files);
              setPreviewImages(files.map((f) => URL.createObjectURL(f)));
            }
          }}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        {previewImages.map((img, i) => (
          <img
            key={i}
            src={img}
            className="w-20 h-20 object-cover rounded"
          />
        ))}
      </div>

      {/* SUBMIT */}
      <button
        disabled={loading}
        className="bg-black text-white p-3 rounded w-full"
      >
        {loading ? "Saving..." : "Save Product"}
      </button>
    </form>
  );
};
