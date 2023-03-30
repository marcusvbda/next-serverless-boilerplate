import * as dynamoose from "dynamoose";

const ddb = new dynamoose.aws.ddb.DynamoDB({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION
} as any);


dynamoose.aws.ddb.set(ddb);

export default dynamoose