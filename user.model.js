const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        id: { type: String, required: true, unique: true },
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { collection: "user-data" }
);

module.exports = mongoose.model("User", userSchema);