import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://junaid:Junaid12321@blog-shard-00-00.ox8fd.mongodb.net:27017,blog-shard-00-01.ox8fd.mongodb.net:27017,blog-shard-00-02.ox8fd.mongodb.net:27017/blog?ssl=true&replicaSet=atlas-wy6pxh-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Blog");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
