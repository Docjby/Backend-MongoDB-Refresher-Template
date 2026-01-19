import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log(`\n Connected to mdb ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("Connection failed ", error);
    process.exit(1);
  }
};


export default connectDB;
