const mongoose = required("mongoose");

const borrowerSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Type.ObjectId(),
    },
    name: {
        type: String,
        required: true,
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

borrowerSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    },
});

const BorrowerModel = mongoose.model("author", authorSchema);

module.exports = BorrowerModel;