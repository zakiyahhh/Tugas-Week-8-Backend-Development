const mongoose = required("mongoose");

const authorSchema = new mongoose.Schema({
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
    deleteAt: {
        type: Boolean,
        default: false,
    },
});

authorSchema.set("toJSON", {

})