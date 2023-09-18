import mongoose from "mongoose";
import "dotenv/config";

export default mongoose
  .connect(`${process.env.DB_URL}`)
  .then(() => {
    console.log(`Database connected`);
  })
  .catch((e) => {
    console.log(`${e}`);
  });
