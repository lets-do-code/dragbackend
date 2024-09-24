
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
});

const User = mongoose.model.User || mongoose.model('User', userSchema);


export { User }