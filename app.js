require("dotenv").config() // read .env variables

const express = require("express"); // import EXPRESS
const helmet = require("helmet"); // IMPORT helmet to secure api-browser connections 
const app = express(); // create server
const port = process.env.PORT; 
// ENTRY ROUTES IMPORT
const entriesRoutes = require("./routes/entries.routes"); 
// AUTHORS routes import
const authorsRoutes = require("./routes/authors.routes"); 

// express method to read JSON from API requests
app.use(express.json()); 

// USE helmet
app.use(helmet()); 

// ENABLE ROUTES
// http://localhost:3000/api/entries 
app.use("/api/entries", entriesRoutes);
// http://localhost:3000/api/authors
app.use("/api/authors", authorsRoutes); 

// TEST
app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Blog app listening on port ${port}`)
}); 

module.exports = app; 