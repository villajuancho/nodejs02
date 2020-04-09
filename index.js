// index.js

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");

/**
 * Required Internal Modules
 */

var api = require('./api/index');

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */

/**
 * Routes Definitions
 */
app.use('/api', api);
app.get("/", (req, res) => {
  res.status(308).header([ 'Location', '/index.html']) .send("Mensaje inicial");
});

app.use(express.static('./../app001/output/dev'));

/**
 * Server Activation
 */

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });

