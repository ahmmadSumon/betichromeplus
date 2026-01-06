import { v2 as cloudinary } from "cloudinary";
import { env } from "./env";
import { logger } from "./logger";

try {
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    secure: true, // Force HTTPS
  });
  
  logger.info('Cloudinary configured successfully');
} catch (error) {
  logger.error('Cloudinary configuration failed', error as Error);
  throw error;
}

export default cloudinary;
