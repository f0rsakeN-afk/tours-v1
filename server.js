const app = require("./app");
const mongoose = require("mongoose");

const db = process.env.DATABASE_URL.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(db).then(console.log("DB connection successful"));

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled rejecttion! shutting down");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
