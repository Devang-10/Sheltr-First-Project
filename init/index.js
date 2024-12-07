const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const Mongo_Url = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(Mongo_Url);
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    console.log("Existing data deleted.");

    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: "674b405893652602162a8b56",
    }));

    console.log("Inserting data:", initData.data); // Log the data to verify format
    await Listing.insertMany(initData.data);

    console.log("Data was initialized successfully.");
  } catch (error) {
    console.error("Error initializing data:", error);
  }
};

initDB();
