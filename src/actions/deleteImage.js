import cloudinary from "cloudinary/lib/cloudinary";

const deleteImage = async (public_id) => {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
  });

  cloudinary.v2.uploader.destroy(public_id, function (error, result) {
    console.log(result, error)
  })
    .then(resp => console.log(resp))
    .catch(_err => console.log("Something went wrong, please try again later."));
}

export { deleteImage }