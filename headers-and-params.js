const express = require("express");
const app = express();

// need this to read JSON body from POST/PUT requests
app.use(express.json());

/**
 * -----------------------
 * HEADERS
 * -----------------------
 */

// custom header example
app.get("/set-header", (req, res) => {
  res.set("X-Custom-Header", "LearningHeaders123");
  res.send("custom header is now sent back, check in response headers");
});

// reading header from client side
app.get("/read-header", (req, res) => {
  const clientHeader = req.headers["x-my-header"]; // comes from client request
  res.send(`client gave me: ${clientHeader || "nothing was sent"}`);
});

// content type header → tells what kind of data is being sent
app.get("/json-response", (req, res) => {
  res.set("Content-Type", "application/json");
  res.send(JSON.stringify({ msg: "this is json response" }));
});

// auth header → normally for jwt or api key
app.get("/secure", (req, res) => {
  const token = req.headers["authorization"];
  if (token === "Bearer mysecrettoken") {
    res.send("ok you are allowed");
  } else {
    res.status(401).send("not allowed");
  }
});

/**
 * -----------------------
 * QUERY PARAMS
 * -----------------------
 * ex → /search?term=node&limit=5
 */
app.get("/search", (req, res) => {
  const { term, limit } = req.query;
  res.send(`search term = ${term}, limit = ${limit}`);
});

/**
 * -----------------------
 * ROUTE PARAMS
 * -----------------------
 * ex → /users/42 → 42 is available as req.params.id
 */
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`you asked for user ${userId}`);
});

/**
 * -----------------------
 * BODY
 * -----------------------
 * comes from client in POST/PUT
 */
app.post("/add-user", (req, res) => {
  const { name, age } = req.body;
  res.json({
    msg: "user added",
    data: { name, age }
  });
});

app.listen(3000, () => {
  console.log("server is running at 3000");
});
