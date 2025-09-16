const express = require("express");
const app = express();

// Sending a custom header to the client
app.get("/set-header", (req, res) => {
  res.set("X-Custom-Header", "LearningHeaders123"); // custom header
  res.send("Custom header has been set! Check the response headers in your browser or Postman.");
});

app.get("/read-header", (req, res) => {
  const clientHeader = req.headers["x-my-header"]; // reading custom header
  res.send(`You sent me this header: ${clientHeader || "No header provided"}`);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
