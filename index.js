const express = require("express");
const app = express();

/**
 * Custom headers:
 * Developer-defined headers (prefix usually `X-`) used for custom info
 */
app.get("/set-header", (req, res) => {
  res.set("X-Custom-Header", "LearningHeaders123"); // custom header
  res.send("Custom header has been set! Check the response headers in your browser or Postman.");
});
/**
 * Reading headers from client request:
 * Headers sent by client (browser/Postman/etc.) can be read via `req.headers`
 */
app.get("/read-header", (req, res) => {
  const clientHeader = req.headers["x-my-header"]; // reading custom header
  res.send(`You sent me this header: ${clientHeader || "No header provided"}`);
});

/**
 * Content-Type header:
 * Tells server/client the data format (json, html, text, etc.)
 */
app.get("/json-response", (req, res) => {
  res.set("Content-Type", "application/json");
  res.send(JSON.stringify({ message: "This is JSON response" }));
});

/**
 * Authorization header:
 * Commonly used to pass tokens (JWT, API keys)
 */
app.get("/secure", (req, res) => {
  const token = req.headers["authorization"];
  if (token === "Bearer mysecrettoken") {
    res.send("Access granted");
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
