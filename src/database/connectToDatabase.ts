import mongoose from "mongoose";

const connectToDatabase = async (mongoDbUrl: string) => {
  await mongoose.connect(mongoDbUrl);
};

export default connectToDatabase;
