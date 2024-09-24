// models/FilteredData.js
import mongoose from "mongoose";

const FilteredDataSchema = new mongoose.Schema({
    user: {
        name: {
            type: String,
            required: true
        },
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    },
    orders: [
        {
            orderId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            orderDate: {
                type: Date,
                required: true
            },
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            }
        }
    ]
});

const FilteredData = mongoose.model.FilteredData || mongoose.model('FilteredData', FilteredDataSchema);

export { FilteredData }