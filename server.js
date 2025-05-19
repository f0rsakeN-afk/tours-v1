const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./.env" });

const port = process.env.PORT || 3000;
const url = process.env.DATABASE_URL.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(url).then(() => {
  console.log("Database connection successfull");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled rejection! Shutting down");
  console.log(err.name, err.message);
  server.close(()=>{
    process.exit(1)
  })
});
