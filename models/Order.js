
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    name: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    orderDate: Date,
});

const Order = mongoose.model.Order || mongoose.model('Order', orderSchema);


export { Order }