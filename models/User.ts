import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    firstname: String,
    lastname: String,
    user: String,
    email: String,
    password: String,
    activatedAt: { type: Date, default: null },
    recovery: {
        token: { type: String, default: null },
        expires: { type: Date, default: null }
    }
});

const userModel = mongoose.models.users || mongoose.model('users', userSchema);
export default userModel;