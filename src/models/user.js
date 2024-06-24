import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures each email is unique
    },
    avatar: {
        data: Buffer, // For storing avatar image data as a Buffer
        contentType: String, // Content type of the avatar image
    },
    role: {
        type: String,
        required: true,
        default: "CUSTOMER", // Default role is CUSTOMER
    },
    mobile: {
        type: String,
    },
    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "addresses" // Reference to Address collection using ObjectId
    }],
    createdAt: {
        type: Date,
        default: Date.now(), // Default value is the current timestamp
    }
});

const User = mongoose.model("users", userSchema);

export { User };
