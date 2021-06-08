const mongoose = require("mongoose");
require("dotenv").config();
const dbUri =
  "mongodb+srv://Dmitry:03081988@cluster0.1i0lr.mongodb.net/slim-mom?retryWrites=true&w=majority";

const db = mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", () =>
  console.log("Database connection successful!")
);

mongoose.connection.on("error", (err) =>
  console.log(`Database connection error: ${err.message}`)
);

mongoose.connection.on("disconnected", () =>
  console.log("Database disconnected!")
);

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Database connection closed and app terminated!");
  process.exit(1);
});

module.exports = db;
