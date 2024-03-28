import mongoose from "mongoose";

let databaseConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery");
  if (connectToDB) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    const res = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "something",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    databaseConnected = true;
    console.log(
      `MongoDB connected : ${res.connection.host}`.bgYellow.underline.bold
    );
  } catch (error) {
    console.log(error.message);
  }
};
