import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

dotenv.config();

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY || process.env.API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET || process.env.API_SECRET;
const cloudinaryUrl = process.env.CLOUDINARY_URL;

const isPlaceholder = (value) =>
  !value ||
  /your[_-]?cloud[_-]?name|your[_-]?api[_-]?key|your[_-]?api[_-]?secret|default|example/i.test(
    value,
  );

if (cloudinaryUrl) {
  cloudinary.config({ cloudinary_url: cloudinaryUrl, secure: true });
} else if (
  isPlaceholder(cloudName) ||
  isPlaceholder(apiKey) ||
  isPlaceholder(apiSecret)
) {
  throw new Error(
    "Invalid Cloudinary credentials. Set CLOUDINARY_CLOUD_NAME/CLOUD_NAME, CLOUDINARY_API_KEY/API_KEY, and CLOUDINARY_API_SECRET/API_SECRET in .env with your real Cloudinary account values.",
  );
} else {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

const uploadToCloudinary = (buffer, originalname) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "uploads",
        resource_type: "auto",
        public_id: `${Date.now()}-${originalname.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9.-]/g, "")}`,
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      },
    );

    const readable = new Readable();
    readable.push(buffer);
    readable.push(null);
    readable.pipe(stream);
  });
};

export { cloudinary, uploadToCloudinary };
