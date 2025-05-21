import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://kundan16102002:Kund%402004@cluster0.cjamazq.mongodb.net/Youtube?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Connection error:`, error);
  }
};

connectDB();
