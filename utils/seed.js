const connection = require("../config/connection");
const { Thought, User } = require("../models");
const { getRandomName, getRandomThought } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  await Thought.deleteMany({});

  await User.deleteMany({});

  const users = [];

  for (let i = 0; i < 20; i++) {
    const username = getRandomName();
    const email = username.replace(" ", "") + "@email.com";

    const userThought = await Thought.create({
      thoughtText: getRandomThought(),
      username,
    });

    users.push({
      username,
      email,
      thoughts: [userThought._id],
    });
  }

  await User.collection.insertMany(users);

  console.table(users);
  console.info("Seeding complete");
  process.exit(0);
});
