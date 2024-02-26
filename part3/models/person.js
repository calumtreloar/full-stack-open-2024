const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

// if (process.argv.length < 3) {
//   console.log("give password as argument");
//   process.exit(1);
// }

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url)
  .then(result => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("error connecting to MongoDB:", error.message);
  });

const phonebookSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: true },
  number: {
    type: String,
    validate: {
      validator: function (number) {
        return /^\d{2,3}-\d+$/.test(number);
      },
      message: "invalid phone number",
    },
    minlength: 8,
    required: true,
  },
});

phonebookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", phonebookSchema);
