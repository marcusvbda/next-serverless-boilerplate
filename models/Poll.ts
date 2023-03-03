import mongoose from 'mongoose';
const { Schema } = mongoose;

const pollSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    options: [String],
    voters: {
        type: Object,
        required: true
    },
    createdAt: {
        type: Date,
        default: null
    },
    userId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
});

const pollModel = mongoose.models.poll || mongoose.model('poll', pollSchema);
export default pollModel;