import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    try {
      app.listen(process.env.PORT || 8000, (req, res) => {
        console.log(`Listening to port`, process.env.PORT);
      });
    } catch (error) {
      console.log("Listening to port problem");
      console.log(error.message);
    }
  })
  .catch((err) => {
    console.log(err.message);
  });
