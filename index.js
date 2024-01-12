const express = require("express");
const bodyParser = require ("body-parser");
const cors = require ("cors");
const db = require("./src/models");

const app = express();


app.use(bodyParser.json());
app.use(cors());

global.__basedir = __dirname;
var corsOptions = {
  origin: "http://localhost:8000"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.mongoose
    .connect(db.url, {
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });