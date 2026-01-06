import { z } from 'zod';

const envSchema = z.object({
  MONGODB_URI: z.string().min(1, "MongoDB URI is required"),
  NEXTAUTH_SECRET: z.string().min(1, "NextAuth secret is required"),
  NEXTAUTH_URL: z.string().url("NextAuth URL must be valid"),
  CLOUDINARY_CLOUD_NAME: z.string().min(1, "Cloudinary cloud name is required"),
  CLOUDINARY_API_KEY: z.string().min(1, "Cloudinary API key is required"),
  CLOUDINARY_API_SECRET: z.string().min(1, "Cloudinary API secret is required"),
  ADMIN_EMAIL: z.string().email("Admin email must be valid"),
  ADMIN_PASSWORD: z.string().min(6, "Admin password must be at least 6 characters"),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

let env: Env;

try {
  env = envSchema.parse(process.env);
} catch (error) {
  console.error("❌ Invalid environment variables:", error);
  process.exit(1);
}

export { env };