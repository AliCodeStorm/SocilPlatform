const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(

    {
        name: {
            type: String,
            required: true,
            trim: true,
            uppercase: true
        },

        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },

        password: {
            type: String,
            required: true,
            trim: true
        },

        refreshToken: {
            type: String,
        }
    },

    {
        timestamps: true
    }

);

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        return next();
    }

    try {

        this.password = await bcrypt.hash(this.password, 10);
        next();

    } catch (error) {
        next(error);
    }
});

userSchema.methods.isPasswordCorrect = async function (password) {

    try {

        return await bcrypt.compare(password, this.password);

    } catch (error) {

        console.error("Error comparing password:", error);
        return false;

    }
};

const User = mongoose.model("User", userSchema);

module.exports = User;