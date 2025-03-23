require("dotenv").config();

module.exports = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET,
    FRONTEND_URL : process.env.FRONTEND_URL,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_CLOUD_NAME:process.env.CLOUDINARY_CLOUD_NAME

}