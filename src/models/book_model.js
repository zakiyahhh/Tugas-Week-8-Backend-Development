const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    totalStocks: {
        type: Number,
        default: 0,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updatedAt: {
        type: Date,
        default: new Date(),
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

bookSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    },
});

const BookModel = mongoose.model("book", bookSchema);

module.exports = BookModel;