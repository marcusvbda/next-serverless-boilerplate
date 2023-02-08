import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI

const clientPromise = {
  connect: (): any => mongoose.connect(uri)
}

export default clientPromise
