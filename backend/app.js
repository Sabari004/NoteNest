const bodyParser = require("body-parser");
const Note = require("./models/Note");
const User = require("./models/User");
// "mongodb+srv://sabari_admin:17kLt1BkndwqUqqS@cluster0.ppsgpcf.mongodb.net/ReactPro?retryWrites=true&w=majority"
const express = require("express");
const mongoose = require("mongoose"); // new
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());

require("dotenv/config");
const port = process.env.PORT || 8080;
// Connect to MongoDB database
// mongodb+srv://sabarinagsel004:asdfghjkl@cluster0.jucubgk.mongodb.net/NoteNestPro?retryWrites=true&w=majority
mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb+srv://sabarinagsel004:asdfghjkl@cluster0.jucubgk.mongodb.net/NoteNestPro?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  () => console.log("Connected to DB!")
);
app.get("/", async (req, res) => {
  try {
    const posts = await Note.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});
app.get("/id/:id", async (req, res) => {
  try {
    const posts = await Note.findById(req.params.id);
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
  // console.log();
  // return req;
});
app.get("/email/:email", async (req, res) => {
  try {
    const posts = await Note.find({ mail: req.params.email });
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
  // console.log();
  // return req;
});
app.post("/", async (req, res) => {
  const note = new Note({
    mail: req.body.mail,
    note: req.body.note,
    title: req.body.title,
    desc: req.body.desc,
    date: new Date(),
  });
  try {
    const savedNote = await note.save();
    res.json(savedNote);
  } catch (err) {
    res.json({ message: err });
  }
});
app.post("/user", async (req, res) => {
  const { email, name, picture } = req.body;
  try {
    const existingUser = await User.find({ email });

    if (existingUser.length === 0) {
      const user = new User({ email, name, picture });
      const savedUser = await user.save();
      // console.log("dslf;l");
      res.json(savedUser);
    } else {
      res.status(400).json({ message: "User already exists" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error saving user", error: err.message });
  }
});

app.post("/id/:id", async (req, res) => {
  const updatedFields = {
    mail: req.body.mail,
    note: req.body.note,
    title: req.body.title,
  };

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// app.get("/user", async (req, res) => {
//   try {
//     const posts = await User.find();
//     res.json(posts);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });
// app.get("/user/:id", async (req, res) => {
//   try {
//     const posts = await User.find({ username: req.params.id });
//     res.json(posts);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });
// app.get("/user/:id/:pass", async (req, res) => {
//   try {
//     const posts = await User.find({
//       username: req.params.id,
//       password: req.params.pass,
//     });
//     res.json(posts);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });
// app.post("/user", async (req, res) => {
//   const post = new User({
//     username: req.body.username,
//     password: req.body.password,
//     email: req.body.email,
//   });
//   try {
//     const savedPost = await post.save();
//     res.json(savedPost);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
