const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// mongoose.connect(
//   process.env.MONGODB_URI || 'mongodb://localhost/workout',
//   {
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useFindAndModify:false,
//     useUnifiedTopology: true
//   }
// );
const connectDb = async () => {
  await mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workout',
    {
      useNewUrlParser:true,
      useCreateIndex:true,
      useFindAndModify:false,
      useUnifiedTopology: true 
    }
  )
  .then(() => {
    console.log("Connected to database!")
  })
  .catch(() => {
    console.log(err)
  })
}

connectDb().catch(err => console.log(err))

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
