const db = require("../models");
const Donate = db.donate;

const create = (req, res) => {
    const { title,  amount, message} = req.body;

    if (!title || !message  || !amount) {
        res.status(400).send({ message: "All input is required!" });
    }

    const donate = new Donate({
        title: req.body.title,
        amount: req.body.amount,
        message: req.body.message,
        status: req.body.status ? req.body.status : false
    });

    donate.save((err, result) => {
        if (err){
            res.status(500).send({ message: "Error Save Data!" });
        }
        else{
            res.status(201).json(result);
        }
    });
}

module.exports = {
    create
}