// import cloudinary from "cloudinary/lib/cloudinary";

const deleteImage = async (public_id) => {
  const cloudinary = await import("cloudinary/lib/cloudinary");

  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
  });

  try {
    const res = await cloudinary.v2.uploader.destroy(public_id)
    console.log(res)
  } catch (error) {
    console.log("Delete image error", error)
  }
}

export { deleteImage }