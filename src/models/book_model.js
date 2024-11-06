const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },totalStocks: {
        type: Number,
        default: 0,
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

const BookModel = mongoose.model("book", bookSchema);

module.exports = BookModel;