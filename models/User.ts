import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    activatedAt: {
        type: Date,
        default: null
    },
    recovery: {
        token: {
            type: String,
            default: null,
        },
        expires: {
            type: Date,
            default: null,
        },
    }
});

const userModel = mongoose.models.users || mongoose.model('users', userSchema);
export default userModel;