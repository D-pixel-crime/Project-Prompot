import mongoose from "mongoose";
import "colors";

let databaseConnected = false;

export const connectToDB = async () => {
  const pass = encodeURIComponent(process.env.MONGODB_PASS);

  mongoose.set("strictQuery", true);
  if (databaseConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    const res = await mongoose.connect(
      `mongodb+srv://newcriminal:${pass}@darkdementor.rhallfz.mongodb.net/Prompot?retryWrites=true&w=majority&appName=DarkDementor`
    );

    databaseConnected = true;
    console.log(`MongoDB connected : ${res.connection.host}`.bgCyan.bold);
  } catch (error) {
    console.log(error.message);
  }
};
