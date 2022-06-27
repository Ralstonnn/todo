const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
// TODO: Make port to be taken from environment variables
const port = 3001;
app.use(express.json());

// DB
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);
const dbName = "todo";
client.connect();
const db = client.db(dbName);

app.get("/api/get-data", async (req, resp) => {
  const collection = db.collection("item");
  const result = await collection.find({}).toArray();
  let resultObj = {
    todo: [],
    inProgress: [],
    done: [],
  };

  result.forEach((item) => {
    if (item.inProgress) resultObj.inProgress.push(item);
    else if (item.done) resultObj.done.push(item);
    else resultObj.todo.push(item);
  });

  resp.json(resultObj);
});

app.post("/api/add-todo", (req, resp) => {
  console.log(req.body.todo);
  if (req.body.todo === "") return;

  const collection = db.collection("item");
  collection.insertOne({
    text: req.body.todo,
    todo: true,
    inProgress: false,
    done: false,
  });
});

app.post("/api/move-to-to-do", (req, resp) => {
  const collection = db.collection("item");
  collection.updateOne(
    { _id: ObjectId(req.body.id) },
    { $set: { todo: true, inProgress: false, done: false } }
  );
  resp.json({ response: "y" });
});

app.post("/api/move-to-in-progress", (req, resp) => {
  const collection = db.collection("item");
  collection.updateOne(
    { _id: ObjectId(req.body.id) },
    { $set: { todo: false, inProgress: true, done: false } }
  );
  resp.json({ response: "y" });
});

app.post("/api/move-to-done", (req, resp) => {
  const collection = db.collection("item");
  collection.updateOne(
    { _id: ObjectId(req.body.id) },
    { $set: { todo: false, inProgress: false, done: true } }
  );
  resp.json({ response: "y" });
});

app.post("/api/delete", (req, resp) => {
  const collection = db.collection("item");
  collection.deleteOne({ _id: ObjectId(req.body.id) });
  resp.json({ response: "y" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// Closing db connection
// client.close();
