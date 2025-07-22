const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    user: {
        id: {
            type: Number,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        profile_pic: {
            type: String,
            required: true,
            default:"assets/defaultImage.jpeg"
        },
    },
    image: {
        type: String,
        required: true,
        default:"assets/defaultImage.jpeg"
    },
    caption: {
        type: String,
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: [
        {
            id: {
                type: Number,
                required: true,
            },
            username: {
                type: String,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
        },
    ],
}, { timestamps: true }); // adds createdAt and updatedAt

module.exports = mongoose.model("Posts", postSchema);
