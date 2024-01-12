const express = require("express");
const router = express.Router();
// const auth = require("../middleware/auth");

const testingCtrl= require("../controllers/testing.ctrl");

let routes = (app) => {
    router.get("/", (req,res) => {
        res.send("Hello World");
    });
    router.get("/testing", testingCtrl.findAll);
    router.get("/testing/:id", testingCtrl.find);
    app.use(router);
}

module.exports = routes;