import { z } from 'zod';

export const productSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title too long"),
  description: z.string().max(1000, "Description too long").optional(),
  price: z.number().positive("Price must be positive"),
  quantity: z.number().int().min(0, "Quantity cannot be negative"),
  category: z.enum(['Men', 'Women', 'Kids', 'Winter']),
  collections: z.array(z.string()).optional(),
  sizes: z.array(z.string()).optional(),
  colors: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  images: z.array(z.string().url("Invalid image URL")).optional(),
});

export const orderSchema = z.object({
  customerInfo: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    company: z.string().optional(),
    address: z.string().min(1, "Address is required"),
    apartment: z.string().optional(),
    city: z.string().min(1, "City is required"),
    district: z.string().min(1, "District is required"),
    postcode: z.string().optional(),
    phone: z.string().min(10, "Valid phone number required"),
    email: z.string().email("Valid email required").optional(),
    notes: z.string().optional(),
  }),
  items: z.array(z.object({
    _id: z.string(),
    title: z.string(),
    price: z.number().positive(),
    quantity: z.number().int().positive(),
    image: z.string().optional(),
  })).min(1, "At least one item required"),
  subtotal: z.number().positive("Subtotal must be positive"),
  paymentMethod: z.enum(['cod', 'bkash']),
});

export const collectionSchema = z.object({
  name: z.string().min(1, "Collection name is required").max(50, "Name too long"),
  image: z.string().url("Valid image URL required"),
});

export const userSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name too long"),
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type ProductInput = z.infer<typeof productSchema>;
export type OrderInput = z.infer<typeof orderSchema>;
export type CollectionInput = z.infer<typeof collectionSchema>;
export type UserInput = z.infer<typeof userSchema>;