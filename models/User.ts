import uuid from 'uuid';
import dynamoose from './DefaultModel';

const userSchema = new dynamoose.Schema({
    id: {
        type: String,
        hashKey: true,
        default: uuid.v1(),
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
    }
}, {
    timestamps: true,
});

const userModel = dynamoose.model('users', userSchema);
export default userModel;