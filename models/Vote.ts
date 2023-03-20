import mongoose from 'mongoose';
const { Schema } = mongoose;
const { Types } = Schema;

const voteSchema = new Schema({
    guestToken: {
        type: String,
        required: true,
    },
    pollId: {
        type: String,
        required: true,
    },
    votes: {
        type: Types.Mixed
    },
});

const voteModel = mongoose.models.votes || mongoose.model('votes', voteSchema);
export default voteModel;